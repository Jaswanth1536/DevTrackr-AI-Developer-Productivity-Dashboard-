const Repository = require('../models/Repository');
const User = require('../models/User');
const githubService = require('../services/githubService');
const { getIsMockDB } = require('../config/db');
const { store, saveDb } = require('../config/mockDb');

// @desc    Connect GitHub Personal Access Token
// @route   POST /api/repos/connect-token
// @access  Private
const connectToken = async (req, res) => {
  try {
    const { githubToken } = req.body;

    if (!githubToken) {
      return res.status(400).json({ success: false, message: 'Please provide a GitHub Personal Access Token' });
    }

    if (getIsMockDB()) {
      const userIdx = store.users.findIndex(u => u._id === req.user._id);
      if (userIdx === -1) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      store.users[userIdx].githubToken = githubToken;
      saveDb();
    } else {
      await User.findByIdAndUpdate(req.user._id, { githubToken });
    }

    res.status(200).json({
      success: true,
      message: 'GitHub Personal Access Token connected successfully',
      data: { githubToken }
    });
  } catch (error) {
    console.error('Connect token error:', error);
    res.status(500).json({ success: false, message: 'Server error connecting token' });
  }
};

// @desc    Get user's repositories from GitHub REST API
// @route   GET /api/repos/github-list
// @access  Private
const getGithubList = async (req, res) => {
  try {
    // Get user githubToken
    let token = null;

    if (getIsMockDB()) {
      const user = store.users.find(u => u._id === req.user._id);
      token = user ? user.githubToken : null;
    } else {
      const user = await User.findById(req.user._id);
      token = user ? user.githubToken : null;
    }

    // Call service to fetch repos
    const githubRepos = await githubService.fetchUserRepos(token);

    res.status(200).json({
      success: true,
      data: githubRepos
    });
  } catch (error) {
    console.error('Get GitHub list error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error fetching repos from GitHub' });
  }
};

// @desc    Link/connect a list of repositories to the dashboard
// @route   POST /api/repos/link
// @access  Private
const linkRepositories = async (req, res) => {
  try {
    const { repos } = req.body; // Array of repo objects

    if (!repos || !Array.isArray(repos) || repos.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide an array of repositories to connect' });
    }

    const userId = req.user._id;
    const connectedRepos = [];

    for (const repo of repos) {
      const repoData = {
        userId,
        githubId: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        owner: repo.owner.login,
        description: repo.description || '',
        htmlUrl: repo.html_url,
        language: repo.language || 'Unknown',
        starsCount: repo.stargazers_count || 0,
        forksCount: repo.forks_count || 0,
        openIssuesCount: repo.open_issues_count || 0,
        connectedAt: new Date()
      };

      if (getIsMockDB()) {
        // Check if already exists in store
        const existingIdx = store.repositories.findIndex(
          r => r.userId === userId && r.githubId === repo.id
        );

        if (existingIdx !== -1) {
          // Update
          store.repositories[existingIdx] = {
            ...store.repositories[existingIdx],
            ...repoData
          };
          connectedRepos.push(store.repositories[existingIdx]);
        } else {
          // Create
          const newRepo = {
            _id: 'mock_repo_' + Math.random().toString(36).substring(2, 9),
            ...repoData
          };
          store.repositories.push(newRepo);
          connectedRepos.push(newRepo);
        }
      } else {
        const query = { userId, githubId: repo.id };
        const updatedRepo = await Repository.findOneAndUpdate(query, repoData, {
          upsert: true,
          new: true
        });
        connectedRepos.push(updatedRepo);
      }
    }

    if (getIsMockDB()) {
      saveDb();
    }

    res.status(201).json({
      success: true,
      message: 'Repositories connected successfully',
      data: connectedRepos
    });
  } catch (error) {
    console.error('Link repositories error:', error);
    res.status(500).json({ success: false, message: 'Server error linking repositories' });
  }
};

// @desc    Get all connected repositories for current user
// @route   GET /api/repos
// @access  Private
const getConnectedRepos = async (req, res) => {
  try {
    const userId = req.user._id;
    let repos = [];

    if (getIsMockDB()) {
      repos = store.repositories.filter(r => r.userId === userId);
    } else {
      repos = await Repository.find({ userId });
    }

    res.status(200).json({
      success: true,
      data: repos
    });
  } catch (error) {
    console.error('Get connected repos error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching connected repos' });
  }
};

// @desc    Disconnect/delete a repository
// @route   DELETE /api/repos/:id
// @access  Private
const disconnectRepository = async (req, res) => {
  try {
    const repoId = req.params.id;
    const userId = req.user._id;

    if (getIsMockDB()) {
      const initialLength = store.repositories.length;
      store.repositories = store.repositories.filter(
        r => !(r._id === repoId && r.userId === userId)
      );
      
      if (store.repositories.length === initialLength) {
        return res.status(404).json({ success: false, message: 'Repository not found or unauthorized' });
      }
      
      saveDb();
    } else {
      const repo = await Repository.findOneAndDelete({ _id: repoId, userId });
      if (!repo) {
        return res.status(404).json({ success: false, message: 'Repository not found or unauthorized' });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Repository disconnected successfully'
    });
  } catch (error) {
    console.error('Disconnect repository error:', error);
    res.status(500).json({ success: false, message: 'Server error disconnecting repository' });
  }
};

// @desc    Sync repository details (refresh from GitHub)
// @route   POST /api/repos/:id/sync
// @access  Private
const syncRepository = async (req, res) => {
  try {
    const repoId = req.params.id;
    const userId = req.user._id;

    let repo;
    let token = null;

    // 1. Fetch Repository Details from Local DB
    if (getIsMockDB()) {
      repo = store.repositories.find(r => r._id === repoId && r.userId === userId);
      const user = store.users.find(u => u._id === userId);
      token = user ? user.githubToken : null;
    } else {
      repo = await Repository.findOne({ _id: repoId, userId });
      const user = await User.findById(userId);
      token = user ? user.githubToken : null;
    }

    if (!repo) {
      return res.status(404).json({ success: false, message: 'Repository not found' });
    }

    // 2. Query GitHub API for fresh telemetry
    const githubRepos = await githubService.fetchUserRepos(token);
    const freshRepo = githubRepos.find(r => r.id === repo.githubId);

    if (!freshRepo) {
      return res.status(404).json({ success: false, message: 'Repository not found in GitHub catalog' });
    }

    // 3. Update in Database
    const updatedDetails = {
      description: freshRepo.description || '',
      language: freshRepo.language || 'Unknown',
      starsCount: freshRepo.stargazers_count || 0,
      forksCount: freshRepo.forks_count || 0,
      openIssuesCount: freshRepo.open_issues_count || 0,
    };

    if (getIsMockDB()) {
      const idx = store.repositories.findIndex(r => r._id === repoId);
      store.repositories[idx] = {
        ...store.repositories[idx],
        ...updatedDetails
      };
      repo = store.repositories[idx];
      saveDb();
    } else {
      repo = await Repository.findByIdAndUpdate(repoId, updatedDetails, { new: true });
    }

    res.status(200).json({
      success: true,
      message: 'Repository synced successfully',
      data: repo
    });
  } catch (error) {
    console.error('Sync repository error:', error);
    res.status(500).json({ success: false, message: 'Server error syncing repository' });
  }
};

module.exports = {
  connectToken,
  getGithubList,
  linkRepositories,
  getConnectedRepos,
  disconnectRepository,
  syncRepository
};

const {
  fetchRepoCommits,
  fetchPullRequests,
  fetchIssues
} = require("../services/githubService");

const getRepoCommits = async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const token = req.headers.authorization?.split(" ")[1];

    const commits = await fetchRepoCommits(owner, repo, token);

    res.json(commits);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch commits",
      error: error.message,
    });
  }
};

const getIssues = async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const issues = await fetchIssues(owner, repo);

    res.json(issues);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch issues",
      error: error.message,
    });
  }
};

const getPullRequests = async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const token = req.headers.authorization?.split(" ")[1];

    const prs = await fetchPullRequests(owner, repo, token);

    res.json(prs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch PRs",
      error: error.message,
    });
  }
};

module.exports = {
  getRepoCommits,
  getPullRequests,
  getIssues,
};
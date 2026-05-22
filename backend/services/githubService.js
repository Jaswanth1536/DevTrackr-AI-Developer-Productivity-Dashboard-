/**
 * GitHub API service layer
 * Integrates with GitHub REST API or falls back to simulated telemetry
 */

const getMockRepos = () => [
  {
    id: 1001,
    name: 'react-app-template',
    full_name: 'dev-team/react-app-template',
    owner: { login: 'dev-team' },
    description: 'A premium boilerplate for building React SPA projects quickly with Vite and Tailwind.',
    html_url: 'https://github.com/dev-team/react-app-template',
    language: 'JavaScript',
    stargazers_count: 12,
    forks_count: 2,
    open_issues_count: 4
  },
  {
    id: 1002,
    name: 'api-service-express',
    full_name: 'dev-team/api-service-express',
    owner: { login: 'dev-team' },
    description: 'Node.js Express production server template with JWT authentication, custom logging, and Mongoose DB mappings.',
    html_url: 'https://github.com/dev-team/api-service-express',
    language: 'JavaScript',
    stargazers_count: 8,
    forks_count: 1,
    open_issues_count: 2
  },
  {
    id: 1003,
    name: 'tailwind-dashboard-ui',
    full_name: 'dev-team/tailwind-dashboard-ui',
    owner: { login: 'dev-team' },
    description: 'Beautiful pre-styled Tailwind CSS UI components and glassmorphic layouts for modern SaaS tools.',
    html_url: 'https://github.com/dev-team/tailwind-dashboard-ui',
    language: 'CSS',
    stargazers_count: 18,
    forks_count: 4,
    open_issues_count: 1
  },
  {
    id: 1004,
    name: 'ai-model-orchestrator',
    full_name: 'dev-team/ai-model-orchestrator',
    owner: { login: 'dev-team' },
    description: 'Python orchestration layer connecting custom agents to LLM completion endpoints.',
    html_url: 'https://github.com/dev-team/ai-model-orchestrator',
    language: 'Python',
    stargazers_count: 25,
    forks_count: 5,
    open_issues_count: 6
  }
];

const fetchUserRepos = async (token) => {
  // If the user connects with a mock token, skip fetch and return high-fidelity mock data
  if (!token || token.toLowerCase().startsWith('mock')) {
    console.log('🔌 GitHub Service: Token is mock/empty, returning simulated repository catalog.');
    return getMockRepos();
  }

  try {
    console.log('📡 GitHub Service: Querying GitHub REST API for user repositories...');
    const response = await fetch('https://api.github.com/user/repos?per_page=100&sort=updated', {
      method: 'GET',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'DevTrackr-App'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`GitHub API returned status ${response.status}: ${errText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ GitHub Service Error:', error.message);
    console.log('⚠️ Falling back to Mock data due to GitHub API error or sandbox blocks.');
    return getMockRepos();
  }
};

module.exports = {
  fetchUserRepos
};
const axios = require("axios");

const fetchRepoCommits = async (owner, repo, token) => {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/commits`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

module.exports = {
  fetchRepoCommits,
};

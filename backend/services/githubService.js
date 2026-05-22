const axios = require("axios");

const fetchIssues = async (owner, repo) => {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=all`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_PAT}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  return response.data;
};

const getMockRepos = () => [
{
id: 1001,
name: "react-app-template",
full_name: "dev-team/react-app-template",
owner: { login: "dev-team" },
description: "React boilerplate with Vite and Tailwind",
html_url: "https://github.com/dev-team/react-app-template",
language: "JavaScript",
stargazers_count: 12,
forks_count: 2,
open_issues_count: 4,
},
];

const fetchUserRepos = async (token) => {
if (!token || token.toLowerCase().startsWith("mock")) {
console.log("Using mock repositories...");
return getMockRepos();
}

try {
const response = await axios.get(
"https://api.github.com/user/repos?per_page=100&sort=updated",
{
headers: {
Authorization: `token ${token}`,
Accept: "application/vnd.github.v3+json",
},
}
);

```
return response.data;
```

} catch (error) {
console.error("GitHub Repo Fetch Error:", error.message);
return getMockRepos();
}
};

const fetchRepoCommits = async (owner, repo) => {
const response = await axios.get(
`https://api.github.com/repos/${owner}/${repo}/commits`,
{
headers: {
Authorization: `token ${process.env.GITHUB_PAT}`,
Accept: "application/vnd.github.v3+json",
},
}
);

return response.data;
};

const fetchPullRequests = async (owner, repo) => {
const response = await axios.get(
`https://api.github.com/repos/${owner}/${repo}/pulls?state=all`,
{
headers: {
Authorization: `token ${process.env.GITHUB_PAT}`,
Accept: "application/vnd.github.v3+json",
},
}
);

return response.data;
};

module.exports = {
  fetchUserRepos,
  fetchRepoCommits,
  fetchPullRequests,
  fetchIssues,
};

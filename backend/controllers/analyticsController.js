const { fetchRepoCommits } = require("../services/githubService");

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

module.exports = {
  getRepoCommits,
};
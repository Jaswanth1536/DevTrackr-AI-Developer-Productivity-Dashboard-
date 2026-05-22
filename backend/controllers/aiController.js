const { generateInsights } = require("../services/openAiService");

const getAIInsights = async (req, res) => {
  try {
    const mockRepoData = {
      commits: 42,
      prs: 12,
      issues: 5,
    };

    const insights = await generateInsights(mockRepoData);

    res.json({
      insights,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate AI insights",
      error: error.message,
    });
  }
};

module.exports = {
  getAIInsights,
};
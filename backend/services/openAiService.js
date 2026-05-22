const generateInsights = async () => {
return `
🚀 Sprint Summary:
Development activity increased by 32% this week with strong pull request completion rates.

⚠️ Bottleneck Detection:
Two pull requests remained open for more than 5 days, potentially slowing sprint velocity.

✅ Productivity Recommendation:
Prioritize PR reviews and reduce unresolved issue backlog for improved team productivity.

👨‍💻 Contributor Alert:
Contributor 'alex-dev' has shown no commits in the past 7 days.
`;
};

module.exports = {
generateInsights,
};

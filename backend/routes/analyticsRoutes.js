const express = require("express");

const router = express.Router();

const {
  getRepoCommits,
  getPullRequests,
  getIssues
} = require("../controllers/analyticsController");

router.get("/commits/:owner/:repo", getRepoCommits);
router.get("/issues/:owner/:repo", getIssues);

router.get("/prs/:owner/:repo", getPullRequests);

module.exports = router;
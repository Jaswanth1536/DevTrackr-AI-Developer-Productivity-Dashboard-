const express = require("express");

const router = express.Router();

const {
  getRepoCommits,
  getPullRequests,
} = require("../controllers/analyticsController");

router.get("/commits/:owner/:repo", getRepoCommits);

router.get("/prs/:owner/:repo", getPullRequests);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  getRepoCommits,
} = require("../controllers/analyticsController");

router.get("/commits/:owner/:repo", getRepoCommits);

module.exports = router;
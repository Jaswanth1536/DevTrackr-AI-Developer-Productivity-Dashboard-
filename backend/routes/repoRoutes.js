const express = require('express');
const router = express.Router();
const {
  connectToken,
  getGithubList,
  linkRepositories,
  getConnectedRepos,
  disconnectRepository,
  syncRepository
} = require('../controllers/repoController');
const { protect } = require('../middleware/authMiddleware');

// All repository routes require authorization
router.use(protect);

router.post('/connect-token', connectToken);
router.get('/github-list', getGithubList);
router.post('/link', linkRepositories);
router.get('/', getConnectedRepos);
router.delete('/:id', disconnectRepository);
router.post('/:id/sync', syncRepository);

module.exports = router;

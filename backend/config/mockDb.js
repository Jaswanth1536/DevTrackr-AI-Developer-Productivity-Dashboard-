const fs = require('fs');
const path = require('path');

const store = {
  users: [],
  repositories: [],
  commits: [],
  pullrequests: [],
  issues: [],
  aireports: []
};

const dbFilePath = path.join(__dirname, '..', 'mock_db.json');

const loadDb = () => {
  try {
    if (fs.existsSync(dbFilePath)) {
      const data = fs.readFileSync(dbFilePath, 'utf8');
      const parsed = JSON.parse(data);
      Object.assign(store, parsed);
    }
  } catch (err) {
    console.error('Failed to load mock DB file:', err);
  }
};

const saveDb = () => {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(store, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save mock DB file:', err);
  }
};

// Initial load
loadDb();

module.exports = {
  store,
  saveDb
};

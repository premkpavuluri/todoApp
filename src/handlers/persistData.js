const persistData = (db, users, config) => (req, res) => {
  const { dbPath, credentialsPath, writeFile } = config;

  writeFile(dbPath, JSON.stringify(db));
  writeFile(credentialsPath, JSON.stringify(users));
};

module.exports = { persistData };

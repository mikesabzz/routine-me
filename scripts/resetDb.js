const { db } = require('../models/index')

const resetDb = async () => {
  try {
    await db.sync({ force: true })
  } catch (e) {
    throw e
  } finally {
    process.exit()
  }
}

db.sync({ force: true }) // Use { force: true } to drop existing tables
  .then(() => {
    console.log('Database synchronized successfully.');
    run(); // Start your application after syncing
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

resetDb()
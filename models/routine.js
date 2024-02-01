module.exports = (db, Sequelize) => {
    return db.define('routine', {
        startTime: Sequelize.TIME,
        endTime: Sequelize.TIME,
        description: Sequelize.STRING,
    })
} 

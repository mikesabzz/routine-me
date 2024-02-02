const Sequelize = require('sequelize')
const UserModel = require('./user')
const RoutineModel = require('./Routine')
const bcrypt = require('bcrypt')
const dotenv = require("dotenv");

dotenv.config();
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE, SALT_ROUNDS } = process.env;

if (!DB_USERNAME || !DB_PASSWORD || !DB_HOST || !DB_DATABASE || !SALT_ROUNDS) {
  console.error('One or more required environment variables are missing.');
  process.exit(1);
}

// connection to the database
const db = new Sequelize({
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  dialect: "postgres",
  dialectModule: require("pg"),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: console.log,
});
// const db = new Sequelize((process.env.DATABASE_URL || 'postgres://localhost:5432/routine_me'), {
//   database: "routine_me",
//   dialect: 'postgres',
//   define: {
//     underscored: true,
//     returning: true
//   }
// })


const User = UserModel(db, Sequelize);

User.beforeCreate(async (user, options) => {

    //dodo => %^*JU#*bhjfhUi^&#
    const hashedPassword = await bcrypt.hash(
        user.password,
        Number(process.env.SALT_ROUNDS)
    )
    user.password = hashedPassword
});

const Routine = RoutineModel(db,Sequelize)
User.hasMany(Routine)
Routine.belongsTo(User)

module.exports = {
  db,
  User,
  Routine
}


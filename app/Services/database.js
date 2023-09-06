const { Sequelize } = require("sequelize");

// Configure the connection
const sequelize = new Sequelize("db", "user", "password", {
  dialect: "mysql",
  database: "db",
  host: "127.0.0.1",
  port: "3306",
});

// need to create this async function
// since top level await does not work
async function run() {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established");
  } catch (error) {
    console.error("Unable to connect to database", error);
  }
}

// authenticate the connection
run().catch((error) => console.log(error.stack));

module.exports = sequelize;

import { Sequelize } from "sequelize";

const db = new Sequelize("news-website", "root", "arashelaheh", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

import { Sequelize } from "sequelize";

const db = new Sequelize("news-website", "Arash", "UWRlx6/aBL@jd5o.", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

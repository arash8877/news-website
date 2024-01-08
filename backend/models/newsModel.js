import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Category from "../models/categoryModel.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const News = db.define(
  "news",
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    catId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.TEXT, allowNull: false },
    numViews: { type: DataTypes.INTEGER, defaultValue: 0 },
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  { freezeTableName: true }
);

Users.hasMany(News);
News.belongsTo(Users, {foreignKey: 'userId'});

Category.hasMany(News);
News.belongsTo(Category, {foreignKey: 'catId'});




export default News;
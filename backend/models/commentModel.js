import { Sequelize } from "sequelize";
import db from "../config/Database";
import News from "./newsModel";

const {DataTypes} = Sequelize;

const Comments = db.define('comments', {
    newsId: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    name: {type: DataTypes.INTEGER, allowNull: false},
    email: {type: DataTypes.INTEGER, allowNull: false},
    subject: {type: DataTypes.INTEGER, allowNull: false},
    isActive: {type: DataTypes.BOOLEAN, defaultValue: false},
}, {freezeTableName: true});

News.hasMany(Comments);
Comments.belongsTo(News, {foreignKey: 'newsId'});


export default Comments;
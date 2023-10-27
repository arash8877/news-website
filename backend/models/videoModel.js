import { Sequelize } from "sequelize";
import db from "../config/Database";

const { DataTypes } = Sequelize;

const Video = db.define(
  "video",
  {
    video: {
      type: DataTypes.STRING,
    },
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Video;
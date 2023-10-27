import sequelize, {Sequelize} from 'sequelize';
import db from '../config/Database.js';


const {DataTypes} = sequelize;

const Category = db.define('category', {   //to make table named category
    name: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true,
});

export default Category;

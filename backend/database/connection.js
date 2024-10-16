const { Sequelize } = require("sequelize")

require("dotenv").config();

class Database {
    constructor(){
        this._connect();
    }
}
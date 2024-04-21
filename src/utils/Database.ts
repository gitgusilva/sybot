import {Sequelize} from "sequelize";

export default new Sequelize("discord_bot", "root", "", {
    dialect: "mysql",
    host: "localhost",
    logging: false,
    dialectOptions: {
        charset: "utf8mb4",
    }
});

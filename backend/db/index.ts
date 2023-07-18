import { Sequelize } from "sequelize";
import UserModel from "./models/user.model";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
});

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = UserModel;

db.test = async () => {
    try {
        await sequelize.authenticate();
        console.log("Соединение с БД было успешно установлено");
    } catch (e) {
        console.log("Невозможно выполнить подключение к БД: ", e);
    }
};

export default db;

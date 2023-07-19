import { Sequelize, Model, DataTypes } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
});

export class UserModel extends Model {
    declare id: number;
    declare email: string;
    declare access_token: string;
    declare nhi_payed: string;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        email: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        disabled: {
            type: DataTypes.STRING,
        },
        access_token: {
            type: DataTypes.TEXT,
        },
        password: {
            type: DataTypes.TEXT,
        },
        deleted: {
            type: DataTypes.TEXT,
        },
        nhi_payed: {
            type: DataTypes.TEXT,
        },
    },
    { tableName: "users", sequelize }
);

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = UserModel;
(async () => {
    await sequelize.sync();
    await UserModel.sync({ alter: true });
})();
db.test = async () => {
    try {
        await sequelize.authenticate();
        console.log("Соединение с БД было успешно установлено");
    } catch (e) {
        console.log("Невозможно выполнить подключение к БД: ", e);
    }
};

export default db;

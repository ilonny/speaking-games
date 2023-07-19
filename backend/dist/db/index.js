"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
});
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
    },
    disabled: {
        type: sequelize_1.DataTypes.STRING,
    },
    access_token: {
        type: sequelize_1.DataTypes.TEXT,
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
    },
    deleted: {
        type: sequelize_1.DataTypes.TEXT,
    },
    nhi_payed: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, { tableName: "users", sequelize: exports.sequelize });
const db = {};
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = exports.sequelize;
db.user = UserModel;
(async () => {
    await exports.sequelize.sync();
    await UserModel.sync({ alter: true });
})();
db.test = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log("Соединение с БД было успешно установлено");
    }
    catch (e) {
        console.log("Невозможно выполнить подключение к БД: ", e);
    }
};
exports.default = db;
//# sourceMappingURL=index.js.map
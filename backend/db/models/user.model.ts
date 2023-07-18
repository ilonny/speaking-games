const UserModel = (sequelize, Sequelize) => {
    const user = sequelize.define(
        "user",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            createdAt: {
                type: Sequelize.DATE,
            },
            updatedAt: {
                type: Sequelize.DATE,
            },
            username: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
            },
            disabled: {
                type: Sequelize.STRING,
            },
            verification_code: {
                type: Sequelize.INTEGER,
            },
            access_token: {
                type: Sequelize.TEXT,
            },
            password: {
                type: Sequelize.TEXT,
            },
            deleted: {
                type: Sequelize.TEXT,
            },
            confirmed: {
                type: Sequelize.INTEGER,
            },
        },
        { freezeTableName: true }
    );
    return user;
};

export default UserModel;

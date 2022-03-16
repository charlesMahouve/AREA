// AREA MODEL

module.exports = (sequelize, Sequelize) => {
    const Area = sequelize.define("areas", {
        ownerId: {
            type: Sequelize.INTEGER
        },
        isEnabled: {
            type: Sequelize.BOOLEAN
        },
        action: {
            type: Sequelize.JSON,
        },
        reaction: {
            type: Sequelize.JSON,
        },
        description: {
            type: Sequelize.STRING,
        }
    });
    return Area;
};
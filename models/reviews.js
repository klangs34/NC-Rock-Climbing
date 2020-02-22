/* eslint-disable linebreak-style */
// Creating our routes model
module.exports = function (sequelize, DataTypes) {
    var Reviews = sequelize.define("Reviews", {
      //review message
      review: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
      Reviews.associate = function(models) {
          Reviews.belongsTo(models.User, {
          foreignKey: "user_id",
          onDelete: "cascade"
        })
      }
    return Reviews;
  };
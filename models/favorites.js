/* eslint-disable linebreak-style */
// Creating our routes model
module.exports = function (sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {    
  });
  Favorites.associate = function(models) {
    Favorites.belongsTo(models.Routes, {
      foreignKey: "route_id",
      onDelete: "cascade",
      allowNull: true
    }),
    // Associating User with routes
    // When a user favorites a route
    Favorites.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "cascade",
      allowNull: true
    });
  }
  return Favorites;
};

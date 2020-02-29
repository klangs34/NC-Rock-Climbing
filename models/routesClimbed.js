/* eslint-disable linebreak-style */
// Creating our routesClimbed model
module.exports = function (sequelize, DataTypes) {
  var RoutesClimbed = sequelize.define("RoutesClimbed", {
    
  });
  RoutesClimbed.associate = function(models) {
    RoutesClimbed.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "cascade"
    }),
    RoutesClimbed.belongsTo(models.Routes, {
      foreignKey: "route_id",
      onDelete: "cascade"
    })
  }
  return RoutesClimbed;
};

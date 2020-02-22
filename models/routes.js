/* eslint-disable linebreak-style */
// Creating our routes model
module.exports = function (sequelize, DataTypes) {
  var Routes = sequelize.define("Routes", {
    //name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // difficulty
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // rating
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    // location
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    long: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    // dangers
    dangers: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // rating
    distance: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  });
  return Routes;
};
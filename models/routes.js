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
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    // location
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    lon: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    // dangers
    dangers: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // rating
    distance: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  });
  return Routes;
};
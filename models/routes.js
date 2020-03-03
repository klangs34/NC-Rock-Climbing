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
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://via.placeholder.com/300.png/09f/fff"
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

  Routes.associate = function(models) {
    Routes.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "cascade"
    });
  };
  return Routes;
};
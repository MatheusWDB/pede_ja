'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imagemPratos extends Model {
    
    static associate(models) {
      this.belongsTo(models.pratos, {
        foreignKey: {
          name: "idImgPrato",
          allowNull: false
        }
      })
    }
  }
  imagemPratos.init({
    idImgPrato: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    imagem: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'imagemPratos',
  });
  return imagemPratos;
};
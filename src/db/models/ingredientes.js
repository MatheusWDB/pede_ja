'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ingredientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.pratoIngredientes, {
        as: 'ingrediente_pratoIngrediente', 
        foreignKey: { 
          name: 'idIngrediente',
          allowNull: false
        }
      })
      this.belongsToMany(models.pratos, { 
        through: models.pratoIngredientes,
        as: 'ingrediente_prato',  
        foreignKey: { 
          name: 'idIngrediente',
          allowNull: false
        }
      })
    }
  }
  ingredientes.init({
    idIngrediente: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },      
    ingrediente: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ingredientes',
  });
  return ingredientes;
};
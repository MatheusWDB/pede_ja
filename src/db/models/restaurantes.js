'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class restaurantes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.pratos, { 
        as: 'restaurante_prato', 
        foreignKey: { 
          name: 'idRestaurante',
          allowNull: false
        }
      })
      this.hasMany(models.telefonesRestaurante, { 
        as: 'restaurante_telefone', 
        foreignKey: { 
          name: 'idRestaurante',
          primaryKey: true,
          allowNull: false
        }
      })
    }
  }
  restaurantes.init({
    idRestaurante: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    cnpj: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    senha: {
      allowNull: false,
      type: DataTypes.STRING
    },
    logo: {
      type: DataTypes.BLOB
    }
  }, {
    sequelize,
    modelName: 'restaurantes',
  });
  return restaurantes;
};
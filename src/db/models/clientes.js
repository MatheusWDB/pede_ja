'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.pedidos, { 
        as: 'cliente_pedido', 
        foreignKey: { 
          name: 'idCliente',
          allowNull: false
        }
      })
    }
  }
  clientes.init({
    idCliente: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING
    },
    telefone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    mesa: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'clientes',
  });
  return clientes;
};
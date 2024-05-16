'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pratos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.pedidoPratos, {
        as: 'prato_pedidoPrato', 
        foreignKey: { 
          name: 'idPrato',
          allowNull: false
        }
      })
      this.belongsToMany(models.pedidos, { 
        through: models.pedidoPratos,
        as: 'prato_pedido', 
        foreignKey: { 
          name: 'idPrato',
          allowNull: false
        }
      })
      
      this.belongsToMany(models.ingredientes, { 
        through: models.pratoIngredientes,
        as: 'prato_ingrediente', 
        foreignKey: { 
          name: 'idPrato',
          allowNull: false
        }
      })
      this.hasMany(models.pratoIngredientes, {
        as: 'prato_pratoIngrediente', 
        foreignKey: { 
          name: 'idPrato',
          allowNull: false
        }
      })
      this.belongsTo(models.restaurantes, { 
        foreignKey: { 
          name: 'idRestaurante',
          allowNull: false
        }
    })
    }
  }
  pratos.init({
    idPrato: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idRestaurante: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'restaurantes',
        key: 'idRestaurante'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING
    },
    valor: {
      allowNull: false,
      type: DataTypes.DECIMAL(10,2)
    },
    imagem: {
      type: DataTypes.BLOB
    }
  }, {
    sequelize,
    modelName: 'pratos',
  });
  return pratos;
};
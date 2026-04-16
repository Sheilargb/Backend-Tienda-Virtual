'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbb_productos extends Model {
    static associate(models) {
      this.belongsTo(models.tbc_categorias, {
        foreignKey: 'id_categoria',
        as: 'categoria'
      });

      this.hasMany(models.tbd_carrito_detalle, {
        foreignKey: 'id_producto',
        as: 'detalles_carrito',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });
    }
  }
  tbb_productos.init({
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbb_productos',
  });
  return tbb_productos;
};

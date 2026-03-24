'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbb_carritos extends Model {
    static associate(models) {
      this.belongsTo(models.tbc_usuarios, {
        foreignKey: 'id_usuario',
        as: 'usuario',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      this.hasMany(models.tbd_carrito_detalle, {
        foreignKey: 'id_carrito',
        as: 'detalles',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  tbb_carritos.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'pagado', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendiente'
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbb_carritos',
  });
  return tbb_carritos;
};

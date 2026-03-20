'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbc_categorias extends Model {
    static associate(models) {
      this.hasMany(models.tbb_productos, {
        foreignKey: 'id_categoria',
        as: 'productos'
      });
    }
  }
  tbc_categorias.init({
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbc_categorias',
  });


//----------------------------------------------------------------------------------------------------
  tbc_categorias.associate = function(models) {
    // associations can be defined here
    tbc_categorias.hasMany(models.tbb_productos,
        {
            as: 'tbb_productos',
            foreignKey: 'id_categoria',
        }
    );
  };
//----------------------------------------------------------------------------------------------------


  return tbc_categorias;
};

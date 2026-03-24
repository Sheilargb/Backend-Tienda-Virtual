'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const hasForeignKey = async (tableName, columnName) => {
      const foreignKeys = await queryInterface.getForeignKeyReferencesForTable(tableName);

      return foreignKeys.some((foreignKey) => {
        const sourceColumn = foreignKey.columnName || foreignKey.column_name;
        return sourceColumn === columnName;
      });
    };

    if (!(await hasForeignKey('tbb_carritos', 'id_usuario'))) {
      await queryInterface.addConstraint('tbb_carritos', {
        fields: ['id_usuario'],
        type: 'foreign key',
        name: 'fk_tbb_carritos_id_usuario',
        references: {
          table: 'tbc_usuarios',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }

    if (!(await hasForeignKey('tbd_carrito_detalle', 'id_carrito'))) {
      await queryInterface.addConstraint('tbd_carrito_detalle', {
        fields: ['id_carrito'],
        type: 'foreign key',
        name: 'fk_tbd_carrito_detalle_id_carrito',
        references: {
          table: 'tbb_carritos',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }

    if (!(await hasForeignKey('tbd_carrito_detalle', 'id_producto'))) {
      await queryInterface.addConstraint('tbd_carrito_detalle', {
        fields: ['id_producto'],
        type: 'foreign key',
        name: 'fk_tbd_carrito_detalle_id_producto',
        references: {
          table: 'tbb_productos',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });
    }
  },

  async down(queryInterface) {
    const removeConstraintIfExists = async (tableName, constraintName) => {
      try {
        await queryInterface.removeConstraint(tableName, constraintName);
      } catch (error) {
        if (!/constraint|unknown|does not exist/i.test(error.message)) {
          throw error;
        }
      }
    };

    await removeConstraintIfExists('tbd_carrito_detalle', 'fk_tbd_carrito_detalle_id_producto');
    await removeConstraintIfExists('tbd_carrito_detalle', 'fk_tbd_carrito_detalle_id_carrito');
    await removeConstraintIfExists('tbb_carritos', 'fk_tbb_carritos_id_usuario');
  }
};

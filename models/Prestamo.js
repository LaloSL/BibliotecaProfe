const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');
const Usuario = require('./Usuario');
const Libro = require('./Libro');

class Prestamo extends Model { }

Prestamo.init(
  {
    fecha_prestamo: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    fecha_devolucion: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
  sequelize,
  modelName: 'Prestamo',
  tableName: 'prestamos',
});

Usuario.hasMany(Prestamo, { foreignKey: 'usuarioId' });
Prestamo.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Libro.hasMany(Prestamo, { foreignKey: 'libroId' });
Prestamo.belongsTo(Libro, { foreignKey: 'libroId' });

module.exports = Prestamo;

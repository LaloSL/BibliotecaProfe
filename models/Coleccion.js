const { Model, DataTypes } = require('sequelize');

const sequelize = require('./db');
const Usuario = require('./Usuario');

class Coleccion extends Model {}

Coleccion.init(
  {
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Coleccion',
    tableName: 'colecciones'
  }
);

Usuario.hasMany(Coleccion, {
  foreignKey: 'usuarioId'
});

Coleccion.belongsTo(Usuario, {
  foreignKey: 'usuarioId'
});

module.exports = Coleccion;
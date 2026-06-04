const { Model, DataTypes } = require('sequelize');

const sequelize = require('./db');

class Etiqueta extends Model {}

Etiqueta.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    modelName: 'Etiqueta',
    tableName: 'etiquetas'
  }
);

module.exports = Etiqueta;
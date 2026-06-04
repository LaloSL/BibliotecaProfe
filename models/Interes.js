const { Model, DataTypes } = require('sequelize');

const sequelize = require('./db');

const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');

class Interes extends Model {}

Interes.init(
  {

    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendiente'
    }

  },
  {
    sequelize,
    modelName: 'Interes',
    tableName: 'intereses'
  }
);

// ======================================
// RELACIONES
// ======================================

// Usuario interesado
Usuario.hasMany(Interes, {
  foreignKey: 'usuarioInteresadoId'
});

Interes.belongsTo(Usuario, {
  foreignKey: 'usuarioInteresadoId',
  as: 'usuarioInteresado'
});

// Publicación interesada
Publicacion.hasMany(Interes, {
  foreignKey: 'publicacionId'
});

Interes.belongsTo(Publicacion, {
  foreignKey: 'publicacionId'
});

module.exports = Interes;
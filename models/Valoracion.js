const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

const Usuario = require('./Usuario');
const Archivo = require('./Archivo');

class Valoracion extends Model {}

Valoracion.init(
  {
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    }
  },
  {
    sequelize,
    modelName: 'Valoracion',
    tableName: 'valoraciones',
    indexes: [
      {
        // Asegura que un usuario solo pueda valorar un archivo una vez
        unique: true,
        fields: ['usuarioId', 'archivoId']
      }
    ]
  }
);

// ===============================
// RELACIONES
// ===============================

// Un usuario puede realizar muchas valoraciones
Usuario.hasMany(Valoracion, {
  foreignKey: 'usuarioId'
});

// Cada valoración pertenece a un usuario
Valoracion.belongsTo(Usuario, {
  foreignKey: 'usuarioId'
});

// Un archivo puede recibir muchas valoraciones
Archivo.hasMany(Valoracion, {
  foreignKey: 'archivoId'
});

// Cada valoración pertenece a un archivo
Valoracion.belongsTo(Archivo, {
  foreignKey: 'archivoId'
});

module.exports = Valoracion;
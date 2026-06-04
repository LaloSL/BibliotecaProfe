const { Model, DataTypes } = require('sequelize');

const sequelize = require('./db');

const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');

class Denuncia extends Model {}

Denuncia.init(
  {
    motivo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendiente'
    }
  },
  {
    sequelize,
    modelName: 'Denuncia',
    tableName: 'denuncias'
  }
);

// ===============================
// RELACIÓN CON USUARIO
// ===============================
// Un usuario puede hacer muchas denuncias
Usuario.hasMany(Denuncia, {
  foreignKey: 'usuarioId'
});
// Una denuncia pertenece a un usuario
Denuncia.belongsTo(Usuario, {
  foreignKey: 'usuarioId'
});

// ===============================
// RELACIÓN CON PUBLICACIÓN
// ===============================
// Una publicación puede tener muchas denuncias
Publicacion.hasMany(Denuncia, {
  foreignKey: 'publicacionId'
});
// Una denuncia pertenece a una publicación
Denuncia.belongsTo(Publicacion, {
  foreignKey: 'publicacionId'
});

module.exports = Denuncia;
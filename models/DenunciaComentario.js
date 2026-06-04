const { Model, DataTypes } = require('sequelize');

const sequelize = require('./db');

const Usuario = require('./Usuario');
const Comentario = require('./Comentario');

class DenunciaComentario extends Model {}

DenunciaComentario.init(
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
    modelName: 'DenunciaComentario',
    tableName: 'denuncias_comentarios'
  }
);

// ===============================
// RELACIÓN USUARIO
// ===============================

Usuario.hasMany(DenunciaComentario, {
  foreignKey: 'usuarioId'
});

DenunciaComentario.belongsTo(Usuario, {
  foreignKey: 'usuarioId'
});

// ===============================
// RELACIÓN COMENTARIO
// ===============================

Comentario.hasMany(DenunciaComentario, {
  foreignKey: 'comentarioId'
});

DenunciaComentario.belongsTo(Comentario, {
  foreignKey: 'comentarioId'
});

module.exports = DenunciaComentario;
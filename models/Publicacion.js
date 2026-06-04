const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');
const Usuario = require('./Usuario');

class Publicacion extends Model {}

Publicacion.init(
  {
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    ubicacion: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },

    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    comentarios_habilitados: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },

    estadoPublicacion: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'activa'
    }
  },
  {
    sequelize,
    modelName: 'Publicacion',
    tableName: 'publicaciones'
  }
);

Usuario.hasMany(Publicacion, { foreignKey: 'usuarioId' });
Publicacion.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Publicacion;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');

class Like extends Model {}

Like.init(
  {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    publicacionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Like',     // 👈 singular
    tableName: 'likes'     // 👈 coincide con MySQL
  }
);

// ===============================
// 🔗 RELACIONES
// ===============================

// Un usuario puede dar muchos likes
Usuario.hasMany(Like, { foreignKey: 'usuarioId' });
Like.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Una publicación puede tener muchos likes
Publicacion.hasMany(Like, { foreignKey: 'publicacionId' });
Like.belongsTo(Publicacion, { foreignKey: 'publicacionId' });

module.exports = Like;
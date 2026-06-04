const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');
const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');   


class Comentario extends Model {}

Comentario.init({
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estadoComentario: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'activo'
}
}, {
  sequelize,
  modelName: 'Comentario',
  tableName: 'comentarios'
});

Usuario.hasMany(Comentario, { foreignKey: 'usuarioId' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Publicacion.hasMany(Comentario, { foreignKey: 'publicacionId' });
Comentario.belongsTo(Publicacion, { foreignKey: 'publicacionId' });

module.exports = Comentario;
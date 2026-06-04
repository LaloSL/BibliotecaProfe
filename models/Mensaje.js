const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');
const Usuario = require('./Usuario');

class Mensaje extends Model {}

Mensaje.init(
  {
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Mensaje',
    tableName: 'mensajes'
  }
);

// Usuario que envía el mensaje
//un mensaje pertenece a un usuario como emisor, y un usuario puede enviar muchos mensajes, por eso se usa belongsTo en el modelo de mensaje
Mensaje.belongsTo(Usuario, {
  foreignKey: 'emisorId',
  as: 'emisor'
});

// Usuario que recibe el mensaje
//un mensaje pertenece a un usuario como receptor, y un usuario puede recibir muchos mensajes, por eso se usa belongsTo en el modelo de mensaje
Mensaje.belongsTo(Usuario, {
  foreignKey: 'receptorId',
  as: 'receptor'
});

module.exports = Mensaje;
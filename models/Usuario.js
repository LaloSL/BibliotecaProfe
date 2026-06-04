const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('./db');

class Usuario extends Model {
  async validarPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

Usuario.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'usuario'
    },

    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'activo'
    },

    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios'
  }
);

module.exports = Usuario;
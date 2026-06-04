const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Libro extends Model { }

Libro.init(
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    anio_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
  sequelize,
  modelName: "Libro",
  tableName: "libros",
}
);

module.exports = Libro;

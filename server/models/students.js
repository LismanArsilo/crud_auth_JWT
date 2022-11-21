const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "students",
    {
      student_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nim: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "students_nim_key",
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "teachers",
          key: "teacher_id",
        },
      },
      major_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "majors",
          key: "major_id",
        },
      },
      isadmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "students",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "students_nim_key",
          unique: true,
          fields: [{ name: "nim" }],
        },
        {
          name: "students_pkey",
          unique: true,
          fields: [{ name: "student_id" }],
        },
      ],
    }
  );
};

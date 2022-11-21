const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teachers', {
    teacher_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    teacher_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'courses',
        key: 'course_id'
      }
    }
  }, {
    sequelize,
    tableName: 'teachers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "teachers_pkey",
        unique: true,
        fields: [
          { name: "teacher_id" },
        ]
      },
    ]
  });
};

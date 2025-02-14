export default (sequelize, DataTypes) => {
  return sequelize.define('feedback', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  })
}
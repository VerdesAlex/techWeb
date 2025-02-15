/**
 * Defines the 'Team' entity in the database.
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - Sequelize data types.
 * @returns {object} - The Team model.
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('team', {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Team name is required
      },
      description: {
        type: DataTypes.TEXT, // Optional description
      },
    });
  };
import models from '../../models/index.mjs'; // Import models

const getAllUsers = async (req, res, next) => {
  try {
    const users = await models.User.findAll({
      attributes: ['id', 'email', 'type'], // Only fetch necessary fields
    });
    res.status(200).json(users); // Return the list of users
  } catch (err) {
    next(err); // Pass errors to the error-handling middleware
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await models.Project.findAll({
      include: [
        {
          model: models.User, // Include the user who created the project
          attributes: ['email'], // Only fetch the user's email
        },
      ],
    });
    res.status(200).json(projects); // Return the list of projects
  } catch (err) {
    next(err); // Pass errors to the error-handling middleware
  }
};

export default {
  getAllUsers,
  getAllProjects,
};
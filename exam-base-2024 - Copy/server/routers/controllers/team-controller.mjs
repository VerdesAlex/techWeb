import models from '../../models/index.mjs';

/**
 * Get all teams for a user.
 */
const getAllTeams = async (req, res, next) => {
    try {
      const query = {};
      if (req.query.filterField && req.query.filterValue) {
        query.where = {
          [req.query.filterField]: {
            [Op.like]: `%${req.query.filterValue}%`, // Filter by field
          },
        };
      }
      if (req.query.sortField && req.query.sortOrder) {
        query.order = [[req.query.sortField, req.query.sortOrder]]; // Sort by field
      }
      const teams = await models.Team.findAll(query);
      res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  };

/**
 * Create a new team.
 */
const createTeam = async (req, res, next) => {
  try {
    const team = await models.Team.create({
      ...req.body,
      leaderId: req.params.uid, // Set the team leader
    });
    res.status(201).json(team);
  } catch (err) {
    next(err);
  }
};

/**
 * Update a team.
 */
const updateTeam = async (req, res, next) => {
  try {
    const team = await models.Team.findByPk(req.params.tid);
    if (team) {
      await team.update(req.body);
      res.status(200).json(team);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a team.
 */
const deleteTeam = async (req, res, next) => {
  try {
    const team = await models.Team.findByPk(req.params.tid);
    if (team) {
      await team.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
};
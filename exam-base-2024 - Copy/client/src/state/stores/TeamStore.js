import EventEmitter from '../../utils/EventEmitter';
import { SERVER } from '../../config/global';

class TeamStore {
  constructor() {
    this.data = [];
    this.emitter = new EventEmitter();
  }

  async getAll(state, userId) {
    try {
      const response = await fetch(`${SERVER}/api/users/${userId}/teams`, {
        headers: {
          authorization: state.user.data.token,
        },
      });
      if (!response.ok) throw response;
      this.data = await response.json();
      this.emitter.emit('GET_TEAMS_SUCCESS');
    } catch (err) {
      console.warn(err);
      this.emitter.emit('GET_TEAMS_ERROR');
    }
  }

  async createOne(state, userId, team) {
    try {
      const response = await fetch(`${SERVER}/api/users/${userId}/teams`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: state.user.data.token,
        },
        body: JSON.stringify(team),
      });
      if (!response.ok) throw response;
      this.getAll(state, userId); // Refresh the list
    } catch (err) {
      console.warn(err);
      this.emitter.emit('CREATE_TEAM_ERROR');
    }
  }
}

export default TeamStore;
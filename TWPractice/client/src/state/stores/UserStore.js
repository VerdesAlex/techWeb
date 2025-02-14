import EventEmitter from '../../utils/EventEmitter'
import { SERVER } from '../../config/global'

class UserStore {
   constructor () {
    const isValidAuthentication = localStorage.getItem("valid");
    console.log("From local storage, valid auth: ", isValidAuthentication);
    if(isValidAuthentication === "true"){
        const user_data = JSON.parse(localStorage.getItem("user_data"));
        this.data = user_data;
    }
    else {
        this.data = {}
    }
    console.log("Modified user data: ", this.data)
    this.emitter = new EventEmitter()
  }

  async login (email, password) {
    try {
      const response = await fetch(`${SERVER}/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email, 
          password 
        })
      })
      if (!response.ok) {
        throw response
      }
      this.data = await response.json()
      localStorage.setItem("user_data", JSON.stringify(this.data))
      this.emitter.emit('LOGIN_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('LOGIN_ERROR')
    }
  }

  async logout () {
    try {
      const response = await fetch(`${SERVER}/auth/logout`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          token: this.data.token 
        })
      })
      if (!response.ok) {
        throw response
      }
      this.data = {}
      localStorage.removeItem("user_data");
      localStorage.removeItem("valid");
      this.emitter.emit('LOGOUT_SUCCESS');
      window.location.reload();
    } catch (err) {
      console.warn(err)
      this.emitter.emit('LOGOUT_ERROR')
    }
  }
}

export default UserStore
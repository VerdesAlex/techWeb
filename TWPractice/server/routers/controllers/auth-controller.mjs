import bcrypt from 'bcrypt'
import models from '../../models/index.mjs'
import jwt from 'jsonwebtoken'

const login = async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (user) {
      const isPasswordValid = await bcrypt.compare(req.body.password, user.passwordHash)
      if (isPasswordValid) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 3600})
        user.token = token
        await user.save()
        res.status(200).json({ token, email: user.email, id: user.id, type: user.type })
      } else {
        res.status(401).json({ message: 'Invalid email or password' })
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (err) {
    next(err)
  }
}

const logout = async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: {
        token: req.body.token
      }
    })
    if (user) {
      user.token = null
      await user.save()
      res.status(200).json({ message: 'User logged out' })
    } else {
      res.status(401).json({ message: 'Invalid token' })
    }
  } catch (err) {
    next(err)
  }
}

const register = async (req, res, next) => {
  try {
    const user = await models.User.create({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10)
    })
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

const validateToken = async(req, res, next) => {
    try {
        console.log(req.body);
        const token = req.body.token;
        console.log("Received token: ", token)
        const valid = await jwt.verify(token, process.env.JWT_SECRET);
        const exp_date = new Date(valid.exp * 1000)
        const current_date = new Date();
        if(current_date < exp_date){
            return res.status(201).json({error: false, message: "Token valid"});
        }
        return res.status(400).json({error: true, message: "Invalid token"});
    }
    catch(error){
        next(error)
    }
}

export default {
  login,
  logout,
  register,
  validateToken
}
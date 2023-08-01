import User from "./User.js"
import Role from "./Role.js"
import AuthService from "./AuthService.js"
import bcrypt from "bcryptjs" 
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import secret from "./config.js"

const generateAccessToken = (id, roles) => {
     const payload = {
        id,
        roles
     }

     return jwt.sign(payload, secret.secret, {expiresIn: "24h"} )
} 

class AuthController{
    
    async registration(req, res) {
        try {
            const { username, password } = req.body

            const errors = validationResult(req)

            if (!errors.isEmpty() || username.trim() == ""){
                return res.status(500).json({message: 'Ошибка при регистрации', errors}) 
            }
             
            
            const candidate = await User.findOne({username})

            if (candidate) {
                return res.status(500).json({message: 'Пользователь с таким именем уже сущестует'}) 
            }

            const hashPassword = bcrypt.hashSync(password, 7)
            const userRoles = await Role.findOne({value: "USER"})

            const user = new User({username: username, password: hashPassword, roles: [userRoles.value]});
            await user.save()

            return res.status(500).json({message: 'Пользователь успешно зарегестрирован'}  )
        } catch (e) {
            res.status(500).json('Registration error: ' + e) 
        }
    }
    
    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({username})

            if (!user) {
                return res.status(500).json({message: 'Пользователь с таким именем уже сущестует'})  
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) {
                return res.status(500).json({message: 'Пароль введен неверно'})  
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
            
        } catch (e) {
            res.status(500).json('Login error: ' + e) 
        }
    }
    
    async getUsers(req, res) {
        try {
            const users= await User.find()
            return res.json(users)
        } catch (e) {
            res.status(500).json(e) 
        }
    }

        
    async addRole(req, res) {
        try {        
            const {value} = req.params;

            if (value) {
                const role = await AuthService.createRole(value)
                res.status(500).json(role)
            } else {
                res.status(500).json("Введите роль")
            }

        } catch (e) {
            res.status(500).json(e) 
        }
    }
}

export default new AuthController()
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../model/userModel')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const authCtrl = {
    signUp: async (req,res)=> {
        const {email}= req.body
        try {
            const existsUser = await User.findOne({email})
            if(existsUser){
                return res.status(400).json({massage: "This is email already exists"})
            }

            const hashedPasword = await bcrypt.hash(req.body.password,10)

            req.body.password = hashedPasword;

            if(req.body.role){
                req.body.role = Number(req.body.role)
            }

            const user = new User(req.body)
            await user.save()

            const {password,...otherDetails}= user._doc
            const token = JWT.sign(otherDetails, JWT_SECRET_KEY,{expiresIn:'2h'})

            res.status(201).json({massage: "Signup Success" , user: otherDetails, token})
        } catch (error) {
            res.status(503).json({massage: error.massage})
        }
    },
    login: async(req,res)=>{
        try {
            const {email,password}= req.body
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({massage: "Email yoki parol notogri"})
            }
            const verifiy = await bcrypt.compare(password,user.password)

            if(!verifiy){
             return res.status(400).json({massage: "Email yoki parol notogri"})
            }

            delete user._doc.password
            const token = JWT.sign(user._doc, JWT_SECRET_KEY,{expiresIn:'2h'})

            res.status(201).json({massage: "Signup Success" , user, token})

        } catch (error) {
            res.status(503).json({massage: error.massage})
        }
    }
}

module.exports = authCtrl
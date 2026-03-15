const adminModel = require('../models/adminModel')
const { responseReture } = require('../utiles/response')
const { createToken } = require('../utiles/tokenCreate')
const bcrypt = require('bcrypt')
 
class authControllers {
    admin_login = async (req, res) => {
        let { email, password } = req.body
 
        try {
            email = email.trim().toLowerCase()
 
            const admin = await adminModel.findOne({ email }).select('+password')
 
            console.log("Input email:", email)
            console.log("Admin found:", admin)
 
            if (!admin) {
                return responseReture(res, 404, { error: "Email not Found" })
            }
 
            const match = await bcrypt.compare(password, admin.password)
            console.log("Password match:", match)
 
            if (!match) {
                return responseReture(res, 404, { error: "Password Wrong" })
            }
 
            const token = await createToken({
                id: admin._id,
                role: admin.role
            })
 
            res.cookie('accessToken', token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true
            })
 
            return responseReture(res, 200, { token, message: "Login Success" })
 
        } catch (error) {
            console.log(error)
            return responseReture(res, 500, { error: error.message })
        }
    }
}
 
module.exports = new authControllers() 
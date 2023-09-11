/***************************************************************************************************
 * Objetivo: Arquivo para implementar JWT no projeto
 * Data: 11/09/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************************/

const jwt = require("jsonwebtoken")
const SECRET = "aly2n6a4c9a0v0"
const EXPIRES = 36000


const createJWT = async function (payLoad){
    const token = jwt.sign({userID: payLoad}, SECRET, {expiresIn: EXPIRES})

    return token
}

const validateJWT = async function (token){
    let status

    jwt.verify(token, SECRET, async function (err, decode){
        if(err){
            status = false 
        } else {
            status = true
        }

        
    })
    return status

}

module.exports = {
    createJWT,
    validateJWT
}
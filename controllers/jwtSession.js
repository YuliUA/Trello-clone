const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const createUserJwtToken=async (user, password)=>{
    if(!bcrypt.compareSync(password,user.password)){
        throw new Error({msg:'Incorect password'})
    }

    const {id, firstname, lastname, email}=user;
    const payload={
        id,
        firstname,
        lastname,
        email
    }

    return new Promise((resolve,reject)=>{
        jwt.sign(payload, 'secretKey', {expiresIn:3600}, (err, token)=>{
            if(err){
                reject(err);
            }
            resolve({
                success: true,
                token:`Bearer ${token}`
            })
        })
    })
}

module.exports=createUserJwtToken
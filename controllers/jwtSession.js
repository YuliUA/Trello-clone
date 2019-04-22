const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../errors/Errors');

const createUserJwtToken=async (user, password)=>{
    if(!bcrypt.compareSync(password,user.password)){
        console.log('Incorect password');
        throw new UnauthorizedError({message: 'Incorrect password'});
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
const db = require('../db/db');
const bcrypt = require('bcryptjs')

class UserCtrl{
    static async getUserByEmail(email) {
        const query = `select * from demo_users where email='${email}'`;
        try {
            const result = await db(query);
            return result;
        } catch( err ) {
            throw new Error(err.message || JSON.stringify( err ));
        }
    }

    static async createUser(data){
            const {firstname,
                   lastname,
                   email,
                   password} = data;
            
            let isUserExist = await UserCtrl.getUserByEmail(email);
            console.log(isUserExist)

            if(isUserExist.length>0){
                throw new Error({msg:`User with email ${email} already exists`})
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt)
            const query = `insert into demo_users(firstname, lastname,email,password) values ('${firstname}', '${lastname}','${email}', '${hashPassword}')`;

            console.log('--->>>', query)
            try {
                const result = await db(query);
                console.log(result)
                return result;
            } catch( err ) {
                console.log('hello error', JSON.stringify( err ))
                throw new Error(err.message || JSON.stringify( err ));
            }

    }

}

module.exports = UserCtrl;
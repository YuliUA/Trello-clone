const db = require('../db/db');
const bcrypt = require('bcryptjs')

class UserCtrl{
    static async getUserByEmail(email) {
        const query = `select * from demo_users where email='${email}'`;
        try {
            const result = await db(query);
            // console.log(result)
            return result;
        } catch( err ) {
            throw new Error(err.message || JSON.stringify( err ));
        }
    }

    //TODO: get all users from table or get some user according to page params
    static async getAllUsers(params) {
        const query =`select * from demo_users where firstname = '${params.firstname}'`;
        try{
            const result = await db(query)
            return result;
        } catch (err){
            throw new Error (err.message || JSON.stringify( err ))
        }
    }

    static async deleteUser(id){
        const query = `delete from demo_users where id=${id}`;
        try{
            const result = await db(query)
            return result;
        } catch(err){
            throw new Error (err.message || JSON.stringify(err))
        }
    }

    static async updateUserData(data,id){ 
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(data.password, salt)
        const query = `UPDATE demo_users SET firstname='${data.firstname}', lastname = '${data.lastname}', email = '${data.email}', password = '${hashPassword}' WHERE id='${id}'`;
        try{
            const result = await db(query)
            return result;
        } catch(err){
            throw new Error(err.message || JSON.stringify(err))
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
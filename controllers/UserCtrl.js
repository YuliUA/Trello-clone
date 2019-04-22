const db = require('../db/db');
const bcrypt = require('bcryptjs')
const { NotFoundError, UnexpectedError, UnauthorizedError } = require('../errors/Errors');
const UserEnum = require('../enums/user');
const { ValidationError } = require('../errors/Errors');

class UserCtrl {
    static async getUserByEmail(email) {
        const query = `select * from demo_users where email='${email}'`;
        try {
            const result = await db(query);
            return result;
        } catch (err) {
            // throw new UnexpectedError({message: `User with email ${email} already exists`});
            throw new Error(err.message || JSON.stringify(err));
        }
    }

    static async getUserByUserName(firstname, lastname) {
        const query1 = `select * from demo_users where firstname='${firstname}' and lastname='${lastname}'`;
        try {
            const result = await db(query1);
            console.log('here ->', result)
            return result;
        } catch (err) {
            console.log('or here')
            // throw new UnexpectedError({message: `User with firstname ${firstname} and lastname ${lastname} already exists`});
            throw new Error(err.message || JSON.stringify(err));
        }
    }

    static async createUser(data) {
        const { firstname,
            lastname,
            email,
            password } = data;
        const errors = {};

        
            
        let isUserExist = await UserCtrl.getUserByEmail(email);

        let isUserNameExist = await UserCtrl.getUserByUserName(firstname, lastname);

        console.log('isUserExist', isUserExist)

        if (isUserExist.length > 0) {
            errors.email = UserEnum.error.emailEmpty;
            console.log(`UUUUUser with email ${email} already exists`)
            throw new UnauthorizedError({ message: `User with email ${email} already exists` })
           //throw new Error(err.message || JSON.stringify(err));
        }


        // if(isUserNameExist.length>0){
        //      console.log(`User with firstname ${firstname} and lastname ${lastname} already exists`)
        //      throw new Error({msg:`User with firstname ${firstname} and lastname ${lastname} already exists`})
        // }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt)
        const query = `insert into demo_users(firstname, lastname,email,password) values ('${firstname}', '${lastname}','${email}', '${hashPassword}')`;

        console.log('--->>>', query)
        try {
            const result = await db(query);
            console.log('result', result)
            return result;
        } catch (err) {
            console.log('hello error', JSON.stringify(err))
            throw new Error(err.message || JSON.stringify(err));
        }

    }

}

module.exports = UserCtrl;
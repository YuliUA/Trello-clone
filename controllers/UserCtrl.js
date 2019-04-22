const db = require('../db/db');
const bcrypt = require('bcryptjs')
const { NotFoundError, DbError, UnauthorizedError } = require('../errors/Errors');
const UserEnum = require('../enums/user');
const { ValidationError } = require('../errors/Errors');

class UserCtrl {
    static async getUserByEmail(email) {
        const query = `select * from demo_users where email='${email}'`;
        try {
            const result = await db(query);
            return result;
        } catch (err) {
            throw new DbError({message: 'Something went wrong with data base'});
        }
    }
    static async getUserByUserName(firstname, lastname) {
        const query = `select * from demo_users where firstname='${firstname}' and lastname='${lastname}'`;
        try {
            const result = await db(query);
            return result;
        } catch (err) {
            // throw new UnexpectedError({message: `User with firstname ${firstname} and lastname ${lastname} already exists`});
            throw new Error(err.message || JSON.stringify(err));
        }
    }

    static async createUser(data) {
       const { firstname,
            lastname,
            email,
            password } = data;
        const errors = {}
        let isUserExist = await UserCtrl.getUserByEmail(email);
        let isUserNameExist = await UserCtrl.getUserByUserName(firstname, lastname);
        if (isUserExist.length > 0) {
            errors.email = UserEnum.error.emailEmpty;
            throw new DbError({ message: `User with email ${email} already exists` })
        }

        // if(isUserNameExist.length>0){
        //      console.log(`User with firstname ${firstname} and lastname ${lastname} already exists`)
        //      throw new Error({msg:`User with firstname ${firstname} and lastname ${lastname} already exists`})
        // }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt)
        const query = `insert into demo_users(firstname, lastname,email,password) values ('${firstname}', '${lastname}','${email}', '${hashPassword}')`;
        try {
            const result = await db(query);
            return result;
        } catch (err) {
            throw new DbError({message: 'Something went wrong with data base'});
        }
    }
}
module.exports = UserCtrl;
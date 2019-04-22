const db = require('../db/db');
const bcrypt = require('bcryptjs')
const { DbError } = require('../errors/Errors');
const UserEnum = require('../enums/user');

class UserCtrl {
    static async getUserByEmail(email) {
        const query = `select * from demo_users where email='${email}'`;
        try {
            const result = await db(query);
            return result;
        } catch (err) {
            throw new DbError({ message: 'Something went wrong with data base' });
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
        let query1 = 'show tables';
        const result1 = await db(query1);
        function objectFindByKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return array[i];
                }
            }
            throw new DbError({ message: 'Something went wrong with data base' });
        }

        if (objectFindByKey(result1, 'Tables_in_fW8VOkrTuV', 'demo_users')) {
            let query2 = 'describe demo_users';
            const result2 = await db(query2);
            objectFindByKey(result2, 'Field', 'firstname');
            objectFindByKey(result2, 'Field', 'lastname');
            objectFindByKey(result2, 'Field', 'email');
            objectFindByKey(result2, 'Field', 'password');
        }

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
            throw new DbError({ message: 'Something went wrong with data base' });
        }
    }
}
module.exports = UserCtrl;
const db = require('../db/db');
const bcrypt = require('bcryptjs')
const { DbError } = require('../errors/Errors');
const UserEnum = require('../enums/user');
const getOptions = require('../utils/getOptions');
class UserCtrl {
    /**
     * Creates new user.
     * @param {string} email - Email of user, that logging
     */
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

    static async findById(id) {
        const query = `select * from demo_users where id=${id}`;
        try {
            const result = await db(query);
            return result;
        } catch (err) {
            throw new Error(err.message || JSON.stringify(err));
        }
    }
    /** 
     *Show users, according to request
     *@param {object} params - pares key:value 
     * we take only values that have been made like string '<column name> = <value>'
     * exmpl of params object that returns from getOptions(): {0: "firstname = 'John'", 1: "lastname='Dou'"}
     */
    static async getAllUsers(params) {
        let str = Object.values(getOptions(params)).join(' && ');
        let query = `select * from demo_users ${str}`;
        try {
            const result = await db(query);
            return result;
        } catch (err) {
            throw new Error(err.message || JSON.stringify(err));
        }
    }
    /**
     * Function to delete user from mySQL by his ID
     * @param {string} id -user ID
     */
    static async delete(id) {
        const query = `delete from demo_users where id=${id}`;
        try {
            let idExist = await UserCtrl.findById(id);
            if (idExist.length < 1) {
                throw new Error({ msg: `There are no such user with ID: ${id}` });
            }
            const result = await db(query);
            return result;
        } catch (err) {
            throw new Error(err.message || JSON.stringify(err));
        }
    }
    /**
     * Function to update user data from mySQL by his ID, that comes from URL
     * @param {string} id -user ID
     * @param {object} data - user firstname,lastname,email,password
     */
    static async update(data, id) {
        if (data.password) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(data.password, salt);
            data.password = hashPassword;
        }
        let user = await UserCtrl.findById(id);
        let tempoUser = { ...user, ...data };
        const query = `UPDATE demo_users SET firstname='${tempoUser.firstname}', lastname='${tempoUser.lastname}', email = '${tempoUser.email}', password= '${tempoUser.password}'  WHERE id='${id}'`;
        try {
            let idExist = await UserCtrl.findById(id);
            if (idExist.length < 1) {
                throw new Error({ msg: `There are no such user with ID: ${id}` });
            }
            const result = await db(query);
            return result;
        } catch (err) {
            throw new Error(err.message || JSON.stringify(err));
        }
    }


    /**
     * Creates new user.
     * @param {Object} data - new user`s data
     */
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

        let isUserExist = await UserCtrl.getUserByEmail(email);

        if (isUserExist.length > 0) {
            errors.email = UserEnum.error.emailEmpty;
            throw new Error({ msg: `User with email ${email} already exists` })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const query = `insert into demo_users(firstname, lastname,email,password) values ('${firstname}', '${lastname}','${email}', '${hashPassword}')`;
        try {
            const result = await db(query);
            return result;
        } catch (err) {
            throw new Error(err.message || JSON.stringify(err));
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
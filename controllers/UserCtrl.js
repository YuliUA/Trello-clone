const db = require('../db/db');
const bcrypt = require('bcryptjs')

class UserCtrl {
    /**
     * Creates new user.
     * @param {string} email - Email of user, that logging
     */
     
    static async getUserByEmail(email) {
        const query = `select * from demo_users where email='${email}'`;
        try {
            const result = await db(query);
            // console.log(result)
            return result;
        } catch (err) {
            throw new Error(err.message || JSON.stringify(err));
        }
    }

    static async findById(id){
        const query =`select * from demo_users where id=${id}`
        try{
            const result = await db(query)
            return result
        } catch(err){
            throw new Error (err.message || JSON.stringify(err));
        }
    }
    /** 
     *Show users, according to request
     *@param {object} params - pares key:value 
     * we take only values that have been made like string '<column name> = <value>'
     * exmpl of params object that returns from getOptions(): {0: "firstname = 'John'", 1: "lastname='Dou'"}
     */
    static async getAllUsers(params) {
        let str = Object.values(params).join(' && ')
        let query = 'select * from demo_users where ' + str;
        console.log(query)
        try {
            const result = await db(query)
            return result;
        } catch (err) {
            throw new Error(err.message || JSON.stringify(err))
        }
    }
/**
 * Function to delete user from mySQL by his ID
 * @param {string} id -user ID
 */
    static async delete(id) {
        const query = `delete from demo_users where id=${id}`;
        try {
            let idExist = await UserCtrl.findById(id)
            console.log(idExist.length)
            if (idExist.length < 1) {
                throw new Error({ msg: `There are no such user with ID: ${id}`})
            }
            const result = await db(query)
            return result;
        } catch (err) {
            throw new Error(err.message || JSON.stringify(err))
        }
    }
/**
 * Function to update user data from mySQL by his ID, that comes from URL
 * @param {string} id -user ID
 * @param {object} data - user firstname,lastname,email,password
 */
    static async update(data, id) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(data.password, salt)
        const query = `UPDATE demo_users SET firstname='${data.firstname}', lastname = '${data.lastname}', email = '${data.email}', password = '${hashPassword}' WHERE id='${id}'`;
        try {
            let idExist = await UserCtrl.findById(id)
            if (idExist.length < 1) {
                throw new Error({ msg: `There are no such user with ID: ${id}`})
            }
            const result = await db(query)
            return result;
        } catch (err) {
            throw new Error(err.message || JSON.stringify(err))
        }
    }


/**
 * Creates new user.
 * @param {Object} data - new user`s data
 */
    static async createUser(data) {
        const { firstname,
            lastname,
            email,
            password } = data;

        let isUserExist = await UserCtrl.getUserByEmail(email);
        
        if (isUserExist.length > 0) {
            throw new Error({ msg: `User with email ${email} already exists` })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt)
        const query = `insert into demo_users(firstname, lastname,email,password) values ('${firstname}', '${lastname}','${email}', '${hashPassword}')`;
        try {
            const result = await db(query);
            return result;
        } catch (err) {
            throw new Error(err.message || JSON.stringify(err));
        }

    }

}

module.exports = UserCtrl;
const mysql =require('mysql');

const connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'fW8VOkrTuV',
    password: 'YOEsvfpmjm',
    database: 'fW8VOkrTuV'
});

connection.connect();

const query = (str) => {
    return new Promise((resolve, reject) => {
        connection.query(str, ( error, result) => {
            if ( error ) {
                console.log(JSON.stringify(error));
                return reject(error);
            }
            return resolve(result);
        })
    })
}

 module.exports=query;
const { connect, connection } = require('mongoose');
const {config} = require('dotenv')

exports.connection = () => {
    const ENV = process.env.NODE_ENV || "development";
    config({
        path: `${__dirname}/.env.${ENV}`,
    });
    if (!process.env.DB_URI && !process.env.TEST_DB_URI) {
        throw new Error("DB_URI or TEST_DB_URI not set");
    }

    const uri = process.env.DB_URI;
        return connect(uri, {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD,
        })
        .then((result) => {
            //console.log('Connection estabislished with MongoDB');
            return result
        })
        .catch(error => {
            console.error(error.message)
        });
}
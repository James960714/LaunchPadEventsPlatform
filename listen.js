const {connection} = require('./connection')
const app = require("./app");
const { PORT = 9092 } = process.env;
connection()
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

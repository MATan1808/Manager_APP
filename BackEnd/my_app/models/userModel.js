const { sql } = require("../connectDB");

// tim user theo username
async function findUserByUsername(username) {
    const result = await sql.query(`SELECT * FROM users WHERE username = '${username}'`);
    return result.recordset[0];
}

// tim user theo email
async function findUserByEmail(email) {
    const result = await sql.query(`SELECT * FROM users WHERE email = '${email}'`);
    return result.recordset[0];
}
// them user moi 
async function createUser(username, email, password) {
    await sql.query `
    INSERT INTO users (username, password, email)
    VALUES (${username}, ${password}, ${email})
`;
}
// cap nhat user
module.exports = {
    findUserByUsername,
    findUserByEmail,
    createUser,
};
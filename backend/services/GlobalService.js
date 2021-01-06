const db = require('../db');

class GlobalService {
    async getUsers() {
        return db.query('SELECT name, login, category AS role FROM users AS U JOIN access AS A  ON U.access_id = A.id');
    }
}

module.exports = new GlobalService();
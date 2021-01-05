const db = require('../db');

class CategoriesService {
    async getCategories(){
        return db.query('SELECT * FROM categories');
    }

    async getCategory(id){
        return db.query('SELECT * FROM categories WHERE id=$1', [id]);
    }

    async addCategory(name){
        return db.query('INSERT INTO categories (category) VALUES ($1)', [name]);
    }

    async updateCategory(id, name){
        return db.query('UPDATE categories SET category=$1 WHERE id=$2', [name, id])
    }

    async deleteCategory(id){
        return db.query('DELETE FROM categories WHERE id=$1', [id])
    }
}

module.exports = new CategoriesService();
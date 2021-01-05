const db = require('../db');

class RecipesService {
    async getRecipes() {
        return db.query('SELECT * FROM recipes');
    }

    async getRecipe(id) {
        return db.query('SELECT * FROM recipes WHERE id=$1', [id])
    }

    async addRecipe(title, description, img, category_id = 1) {
        return db.query('INSERT INTO recipes (user_id, title, category_id, description, price, img) VALUES (1, $1, $4, $2, 0, $3)', [title, description, img, category_id]);
    }

    async updateRecipe(id, title, description, img, category_id = 1) {
        return db.query('UPDATE recipes SET title=$1, description=$2, img=$3, category_id=$4 WHERE id=$5', [title, description, img, Number(category_id), Number(id)]);
    }

    async deleteRecipe(id) {
        return db.query('DELETE FROM recipes WHERE id=$1', [id]);
    }
}

module.exports = new RecipesService();
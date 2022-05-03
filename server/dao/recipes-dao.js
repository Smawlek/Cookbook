const crypto = require("crypto");
const mysql = require('mysql');
const express = require("express");
const cors = require("cors");
const { resolve } = require("path");
const { rejects } = require("assert");
const app = express();
const mysqlSync = require('sync-mysql');

app.use(express.json());
app.use(cors());

class RecipesDao {
    async CreateRecipe(recipe) {
        const connectionSync = this._connectDBSync();

        let sql = `INSERT INTO recipes VALUES 
        (NULL, 
            '${recipe.title}', 
            '${recipe.description}', 
            '${recipe.process}', 
            '${recipe.image}', 
            ${recipe.portions}, 
            ${recipe.estimatedTime},
            ${recipe.estimatedPrice}, 
            CURRENT_TIMESTAMP,
            ${recipe.category},
            ${recipe.author})`;

        return connectionSync.query(sql);
    }

    async GetRecipe(id) {
        const connectionSync = this._connectDBSync();
        
        let sql = `SELECT * FROM recipes WHERE id_re = ${id}`;
        
        return JSON.stringify(connectionSync.query(sql));
    }

    async ListRecipes() {
        const connectionSync = this._connectDBSync();
        
        let sql = `SELECT * FROM recipes`;
        
        return JSON.stringify(connectionSync.query(sql));
    }

    async DeleteRecipe(id) {
        const connectionSync = this._connectDBSync();
        
        const syncResult = connectionSync.query(`DELETE FROM recipes WHERE id_re=${id}`);

        return id;
    }

    _connectDBSync() {
        var connectionSync = new mysqlSync(
            {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'cookbook'
            }
        )

        return connectionSync;
    }
}

module.exports = RecipesDao;
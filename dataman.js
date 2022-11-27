require('dotenv').config();

const datastore = require('nedb');
const users_database = new datastore({ filename: 'databases/users_database', autoload: true });
const wishlist_database = new datastore({ filename: 'databases/wishlist_database', autoload: true });

module.exports = {
    users_database,
    wishlist_database
}
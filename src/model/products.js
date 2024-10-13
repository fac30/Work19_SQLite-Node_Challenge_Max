const db = require("../database/db.js");


function listProducts() {
    const select_products = db.prepare(/*sql*/ `
        SELECT
            id,
            name,
            quantity_per_unit,
            unit_price, units_in_stock,
            units_on_order
        FROM products
        `
    );
    return select_products.all();
}

function searchProducts(string) {
    const search_products = db.prepare(/*sql*/ `
        SELECT
            id,
            name
        FROM products
        WHERE name LIKE ?
    `);
    return search_products.all("%" + string + "%");
}

function getProduct(id) {
    const search_products = db.prepare(/*sql*/ `
        SELECT
            products.id AS id,
            products.name AS name,
            categories.name AS category_name,
            categories.description AS category_description
        FROM products JOIN categories
        ON products.category_id = categories.id
        AND products.id = ?
    `);
    return search_products.get(id);
}

module.exports = { listProducts, searchProducts, getProduct };
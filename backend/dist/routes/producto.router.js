"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_1 = require("../controllers/producto.controller");
const ProductosRouter = (0, express_1.Router)();
ProductosRouter.post('/', producto_controller_1.createProducto); // Crear un nuevo producto
ProductosRouter.get('/', producto_controller_1.getProductos); // Obtener la lista de productos
ProductosRouter.get('/:idProducto', producto_controller_1.getProductoById); // Obtener un producto por ID
ProductosRouter.put('/:idProducto', producto_controller_1.updateProducto); // Actualizar un producto por ID
ProductosRouter.delete('/:idProducto', producto_controller_1.deleteProducto); // Eliminar un producto por ID
//ProductosRouter.get('/search/:searchTerm', searchProductos); // Buscar productos por término
exports.default = ProductosRouter;

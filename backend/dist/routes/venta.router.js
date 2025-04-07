"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const venta_controller_1 = require("../controllers/venta.controller");
const VentasRouter = (0, express_1.Router)();
VentasRouter.post('/', venta_controller_1.crearVenta); // Crear una nueva venta
VentasRouter.get('/', venta_controller_1.obtenerVentas); // Obtener todas las ventas
VentasRouter.get('/:id', venta_controller_1.obtenerVentaPorId); // Obtener una venta por ID
VentasRouter.put('/:id', venta_controller_1.actualizarVenta); // Actualizar una venta por ID
VentasRouter.delete('/:id', venta_controller_1.eliminarVenta); // Eliminar una venta por ID
exports.default = VentasRouter;

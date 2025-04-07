"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalleventa_controller_1 = require("../controllers/detalleventa.controller");
const DetalleVentaRouter = (0, express_1.Router)();
DetalleVentaRouter.post('/', detalleventa_controller_1.createDetalleVenta); // Crear un nuevo detalle de venta
DetalleVentaRouter.get('/', detalleventa_controller_1.getDetalleVentas); // Obtener la lista de detalles de venta
DetalleVentaRouter.get('/:idDetalleVenta', detalleventa_controller_1.getDetalleVentaById); // Obtener un detalle de venta por ID
DetalleVentaRouter.put('/:idDetalleVenta', detalleventa_controller_1.updateDetalleVenta); // Actualizar un detalle de venta por ID
DetalleVentaRouter.delete('/:idDetalleVenta', detalleventa_controller_1.deleteDetalleVenta); // Eliminar un detalle de venta por ID
DetalleVentaRouter.get('/venta/:idVenta', detalleventa_controller_1.getDetalleByIdVenta); // ✅ Nueva ruta agregada
exports.default = DetalleVentaRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comprobante_controller_1 = require("../controllers/comprobante.controller");
const ComprobanteRouter = (0, express_1.Router)();
ComprobanteRouter.post('/', comprobante_controller_1.createComprobante); // Crear un nuevo comprobante
ComprobanteRouter.get('/', comprobante_controller_1.getComprobantes); // Obtener la lista de comprobantes
ComprobanteRouter.get('/resumen/', comprobante_controller_1.obtenerResumenVentas); // Obtener todas las ventas
ComprobanteRouter.get('/productosxsemana/', comprobante_controller_1.obtenerProductosMasVendidosSemana); // Obtener todas las ventas
ComprobanteRouter.get('/:idComprobante', comprobante_controller_1.getComprobanteById); // Obtener un comprobante por ID
ComprobanteRouter.put('/:idComprobante', comprobante_controller_1.updateComprobante); // Actualizar un comprobante por ID
ComprobanteRouter.delete('/:idComprobante', comprobante_controller_1.deleteComprobante); // Eliminar un comprobante por ID
ComprobanteRouter.get('/ultima-serie/:tipo', comprobante_controller_1.obtenerUltimaSerie); // ✅ Nueva ruta agregada
ComprobanteRouter.get('/venta/:idVenta', comprobante_controller_1.getComprobanteventabyVentaID); // ✅ Nueva ruta agregada 
exports.default = ComprobanteRouter;

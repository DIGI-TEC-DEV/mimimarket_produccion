"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipocomprobante_controller_1 = require("../controllers/tipocomprobante.controller");
const TipoComprobanteRouter = (0, express_1.Router)();
TipoComprobanteRouter.post('/', tipocomprobante_controller_1.createTipoComprobante); // Crear un nuevo tipo de comprobante
TipoComprobanteRouter.get('/', tipocomprobante_controller_1.getTipoComprobantes); // Obtener la lista de tipos de comprobantes
TipoComprobanteRouter.get('/:idTipoComprobante', tipocomprobante_controller_1.getTipoComprobanteById); // Obtener un tipo de comprobante por ID
TipoComprobanteRouter.put('/:idTipoComprobante', tipocomprobante_controller_1.updateTipoComprobante); // Actualizar un tipo de comprobante por ID
TipoComprobanteRouter.delete('/:idTipoComprobante', tipocomprobante_controller_1.deleteTipoComprobante); // Eliminar un tipo de comprobante por ID
exports.default = TipoComprobanteRouter;

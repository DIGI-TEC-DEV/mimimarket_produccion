"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarVenta = exports.actualizarVenta = exports.obtenerVentaPorId = exports.obtenerVentas = exports.crearVenta = void 0;
const venta_model_1 = __importDefault(require("../models/venta.model"));
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const crearVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_cliente, id_empleado, fecha_venta, pago } = req.body;
        // Validar que los campos obligatorios estén presentes
        if (!id_cliente || !id_empleado || !fecha_venta || !pago) {
            res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
            return;
        }
        // Crear la venta
        const nuevaVenta = yield venta_model_1.default.create({
            id_cliente,
            id_empleado,
            fecha_venta,
            pago
        });
        res.status(201).json(nuevaVenta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear la venta.' });
    }
});
exports.crearVenta = crearVenta;
const obtenerVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ventas = yield venta_model_1.default.findAll({
            include: [
                { model: cliente_model_1.default, as: 'Cliente' },
                { model: empleado_model_1.default, as: 'Empleado' }
            ]
        });
        res.status(200).json(ventas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las ventas.' });
    }
});
exports.obtenerVentas = obtenerVentas;
const obtenerVentaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const venta = yield venta_model_1.default.findByPk(id, {
            include: [
                { model: cliente_model_1.default, as: 'Cliente' },
                { model: empleado_model_1.default, as: 'Empleado' }
            ]
        });
        if (!venta) {
            res.status(404).json({ mensaje: 'Venta no encontrada.' });
            return;
        }
        res.status(200).json(venta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener la venta.' });
    }
});
exports.obtenerVentaPorId = obtenerVentaPorId;
const actualizarVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { id_cliente, id_empleado, fecha_venta, pago } = req.body;
        // Validar que los campos obligatorios estén presentes
        if (!id_cliente || !id_empleado || !fecha_venta || !pago) {
            res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
            return;
        }
        const venta = yield venta_model_1.default.findByPk(id);
        if (!venta) {
            res.status(404).json({ mensaje: 'Venta no encontrada.' });
            return;
        }
        // Actualizar la venta
        yield venta.update({
            id_cliente,
            id_empleado,
            fecha_venta,
            pago
        });
        res.status(200).json(venta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar la venta.' });
    }
});
exports.actualizarVenta = actualizarVenta;
const eliminarVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const venta = yield venta_model_1.default.findByPk(id);
        if (!venta) {
            res.status(404).json({ mensaje: 'Venta no encontrada.' });
            return;
        }
        // Eliminar la venta
        yield venta.destroy();
        res.status(200).json({ mensaje: 'Venta eliminada correctamente.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar la venta.' });
    }
});
exports.eliminarVenta = eliminarVenta;

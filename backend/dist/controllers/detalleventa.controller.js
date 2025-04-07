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
exports.getDetalleByIdVenta = exports.deleteDetalleVenta = exports.getDetalleVentaById = exports.updateDetalleVenta = exports.getDetalleVentas = exports.createDetalleVenta = void 0;
const detalleventa_model_1 = __importDefault(require("../models/detalleventa.model"));
const venta_model_1 = __importDefault(require("../models/venta.model"));
const inventario_model_1 = __importDefault(require("../models/inventario.model"));
const producto_model_1 = __importDefault(require("../models/producto.model"));
const bebida_model_1 = __importDefault(require("../models/bebida.model"));
const alimento_model_1 = __importDefault(require("../models/alimento.model"));
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const unidadmedida_model_1 = __importDefault(require("../models/unidadmedida.model"));
const createDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_venta, id_inventario, cantidad, precio_unitario } = req.body;
    try {
        // Crea un nuevo detalle de venta
        const nuevoDetalleVenta = yield detalleventa_model_1.default.create({
            id_venta,
            id_inventario,
            cantidad,
            precio_unitario,
            //  subtotal
        });
        res.status(201).json(nuevoDetalleVenta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error, comuníquese con soporte' });
    }
});
exports.createDetalleVenta = createDetalleVenta;
const getDetalleVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detalleVentas = yield detalleventa_model_1.default.findAll({
            include: [
                {
                    model: venta_model_1.default,
                    as: 'Venta',
                    include: [
                        { model: cliente_model_1.default, as: 'Cliente' }, // Incluir Cliente
                        { model: empleado_model_1.default, as: 'Empleado' } // Incluir Empleado
                    ]
                },
                {
                    model: inventario_model_1.default,
                    as: 'Inventario',
                    include: [
                        {
                            model: producto_model_1.default,
                            as: 'Producto',
                            include: [
                                { model: bebida_model_1.default, as: 'Bebida' }, // Incluir Bebida
                                { model: alimento_model_1.default, as: 'Alimento' }, // Incluir Alimento
                                { model: unidadmedida_model_1.default, as: 'UnidadMedida' }
                            ]
                        }
                    ]
                }
            ],
        });
        res.json(detalleVentas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de detalles de venta' });
    }
});
exports.getDetalleVentas = getDetalleVentas;
const updateDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idDetalleVenta } = req.params;
    const { id_venta, id_inventario, cantidad, precio_unitario, subtotal } = req.body;
    try {
        const detalleVenta = yield detalleventa_model_1.default.findByPk(idDetalleVenta);
        if (!detalleVenta) {
            res.status(404).json({ msg: `No existe un detalle de venta con el id ${idDetalleVenta}` });
            return;
        }
        // Actualizar el detalle de venta con los campos proporcionados en la solicitud
        if (id_venta)
            detalleVenta.id_venta = id_venta;
        if (id_inventario)
            detalleVenta.id_inventario = id_inventario;
        if (cantidad)
            detalleVenta.cantidad = cantidad;
        if (precio_unitario)
            detalleVenta.precio_unitario = precio_unitario;
        if (subtotal)
            detalleVenta.subtotal = subtotal;
        yield detalleVenta.save();
        res.json({ msg: 'El detalle de venta fue actualizado con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error, comuníquese con soporte' });
    }
});
exports.updateDetalleVenta = updateDetalleVenta;
const getDetalleVentaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idDetalleVenta } = req.params;
    try {
        const detalleVenta = yield detalleventa_model_1.default.findByPk(idDetalleVenta, {
            include: [
                {
                    model: venta_model_1.default,
                    as: 'Venta',
                    include: [
                        { model: cliente_model_1.default, as: 'Cliente' },
                        { model: empleado_model_1.default, as: 'Empleado' }
                    ]
                },
                {
                    model: inventario_model_1.default,
                    as: 'Inventario',
                    include: [
                        {
                            model: producto_model_1.default,
                            as: 'Producto',
                            include: [
                                { model: bebida_model_1.default, as: 'Bebida' },
                                { model: alimento_model_1.default, as: 'Alimento' },
                                { model: unidadmedida_model_1.default, as: 'UnidadMedida' }
                            ]
                        }
                    ]
                }
            ],
        });
        if (!detalleVenta) {
            res.status(404).json({ msg: 'Detalle de venta no encontrado' });
            return;
        }
        res.json(detalleVenta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el detalle de venta' });
    }
});
exports.getDetalleVentaById = getDetalleVentaById;
const deleteDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idDetalleVenta } = req.params;
    try {
        const detalleVenta = yield detalleventa_model_1.default.findByPk(idDetalleVenta);
        if (!detalleVenta) {
            res.status(404).json({ msg: 'Detalle de venta no encontrado' });
            return;
        }
        yield detalleVenta.destroy();
        res.json({ msg: 'Detalle de venta eliminado con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el detalle de venta' });
    }
});
exports.deleteDetalleVenta = deleteDetalleVenta;
const getDetalleByIdVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idVenta } = req.params;
    try {
        const idVentaNum = parseInt(idVenta, 10);
        if (isNaN(idVentaNum)) {
            res.status(400).json({ msg: "El ID de la venta debe ser un número válido." });
            return;
        }
        const detallesVenta = yield detalleventa_model_1.default.findAll({
            where: { id_venta: idVentaNum },
            include: [
                {
                    model: venta_model_1.default,
                    as: 'Venta',
                    include: [
                        { model: cliente_model_1.default, as: 'Cliente' },
                        { model: empleado_model_1.default, as: 'Empleado' }
                    ]
                },
                {
                    model: inventario_model_1.default,
                    as: 'Inventario',
                    include: [
                        {
                            model: producto_model_1.default,
                            as: 'Producto',
                            include: [
                                { model: bebida_model_1.default, as: 'Bebida' },
                                { model: alimento_model_1.default, as: 'Alimento' },
                                { model: unidadmedida_model_1.default, as: 'UnidadMedida' }
                            ]
                        }
                    ]
                }
            ],
        });
        if (!detallesVenta || detallesVenta.length === 0) {
            res.status(404).json({ msg: "No se encontraron detalles para esta venta." });
            return;
        }
        res.json(detallesVenta);
    }
    catch (error) {
        console.error("Error en getDetalleByIdVenta:", error);
        res.status(500).json({ msg: "Error al obtener la lista de detalles de venta." });
    }
});
exports.getDetalleByIdVenta = getDetalleByIdVenta;

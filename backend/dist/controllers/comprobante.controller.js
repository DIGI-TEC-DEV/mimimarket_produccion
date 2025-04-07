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
exports.obtenerProductosMasVendidosSemana = exports.obtenerResumenVentas = exports.getComprobantesByTipo = exports.getComprobanteventabyVentaID = exports.obtenerUltimaSerie = exports.deleteComprobante = exports.updateComprobante = exports.getComprobanteById = exports.getComprobantes = exports.createComprobante = void 0;
const comprobante_model_1 = __importDefault(require("../models/comprobante.model"));
const venta_model_1 = __importDefault(require("../models/venta.model"));
const tipocomprobante_model_1 = __importDefault(require("../models/tipocomprobante.model"));
const notacredito_model_1 = __importDefault(require("../models/notacredito.model"));
const sequelize_1 = require("sequelize");
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const detalleventa_model_1 = __importDefault(require("../models/detalleventa.model"));
const inventario_model_1 = __importDefault(require("../models/inventario.model"));
const producto_model_1 = __importDefault(require("../models/producto.model"));
const bebida_model_1 = __importDefault(require("../models/bebida.model"));
const alimento_model_1 = __importDefault(require("../models/alimento.model"));
const createComprobante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_venta, igv, descuento, total, id_tipocomprobante, num_serie, estado, razon_anulacion, id_notacredito } = req.body;
    try {
        // Crea un nuevo comprobante
        const nuevoComprobante = yield comprobante_model_1.default.create({
            id_venta,
            igv,
            descuento,
            total,
            id_tipocomprobante,
            num_serie,
            estado,
            razon_anulacion,
            id_notacredito
        });
        res.status(201).json(nuevoComprobante);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error, comuníquese con soporte' });
    }
});
exports.createComprobante = createComprobante;
const getComprobantes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comprobantes = yield comprobante_model_1.default.findAll({
            include: [
                { model: venta_model_1.default, as: 'Venta' },
                { model: tipocomprobante_model_1.default, as: 'Tipocomprobante' },
                { model: notacredito_model_1.default, as: 'Notacredito' }
            ],
            order: [['id', 'DESC']]
        });
        res.json(comprobantes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de comprobantes' });
    }
});
exports.getComprobantes = getComprobantes;
const getComprobanteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idComprobante } = req.params;
    try {
        const comprobante = yield comprobante_model_1.default.findByPk(idComprobante, {
            include: [
                {
                    model: venta_model_1.default,
                    as: 'Venta',
                    include: [
                        { model: cliente_model_1.default, as: 'Cliente' }, // Incluir Cliente
                        { model: empleado_model_1.default, as: 'Empleado' } // Incluir Empleado
                    ]
                },
                { model: tipocomprobante_model_1.default, as: 'Tipocomprobante' },
                { model: notacredito_model_1.default, as: 'Notacredito' }
            ],
        });
        if (!comprobante) {
            res.status(404).json({ msg: 'Comprobante no encontrado' });
            return;
        }
        res.json(comprobante);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el comprobante' });
    }
});
exports.getComprobanteById = getComprobanteById;
const updateComprobante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idComprobante } = req.params;
    const { id_venta, igv, descuento, total, id_tipocomprobante, num_serie, estado, razon_anulacion, id_notacredito } = req.body;
    try {
        const comprobante = yield comprobante_model_1.default.findByPk(idComprobante);
        if (!comprobante) {
            res.status(404).json({ msg: `No existe un comprobante con el id ${idComprobante}` });
            return;
        }
        // Actualizar el comprobante con los campos proporcionados en la solicitud
        if (id_venta)
            comprobante.id_venta = id_venta;
        if (igv)
            comprobante.igv = igv;
        if (descuento)
            comprobante.descuento = descuento;
        if (total)
            comprobante.total = total;
        if (id_tipocomprobante)
            comprobante.id_tipocomprobante = id_tipocomprobante;
        if (num_serie)
            comprobante.num_serie = num_serie;
        if (estado)
            comprobante.estado = estado;
        if (razon_anulacion)
            comprobante.razon_anulacion = razon_anulacion;
        if (id_notacredito)
            comprobante.id_notacredito = id_notacredito;
        yield comprobante.save();
        res.json({ msg: 'El comprobante fue actualizado con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error, comuníquese con soporte' });
    }
});
exports.updateComprobante = updateComprobante;
const deleteComprobante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idComprobante } = req.params;
    try {
        const comprobante = yield comprobante_model_1.default.findByPk(idComprobante);
        if (!comprobante) {
            res.status(404).json({ msg: 'Comprobante no encontrado' });
            return;
        }
        yield comprobante.destroy();
        res.json({ msg: 'Comprobante eliminado con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el comprobante' });
    }
});
exports.deleteComprobante = deleteComprobante;
const obtenerUltimaSerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo } = req.params; // '1' para boleta, '2' para factura, '3' para nota de crédito
        if (!tipo || !['1', '2', '3'].includes(tipo)) {
            res.status(400).json({ mensaje: 'Tipo de documento inválido. Debe ser "1", "2" o "3".' });
            return;
        }
        // Definir el prefijo de la serie según el tipo
        let prefijo = tipo === '1' ? 'B001'
            : tipo === '2' ? 'F001'
                : 'NC01'; // Corregido el error de la coma
        let nuevaSerie = `${prefijo}-0001`; // Valor por defecto
        // Buscar el último comprobante registrado con el tipo especificado
        const ultimoComprobante = yield comprobante_model_1.default.findOne({
            where: { id_tipocomprobante: tipo },
            order: [['num_serie', 'DESC']]
        });
        if (ultimoComprobante) {
            const numSerie = ultimoComprobante.getDataValue('num_serie');
            if (numSerie) {
                const partes = numSerie.split('-'); // Separa en partes por el guion
                if (partes.length === 2) {
                    const numero = partes[1]; // Se obtiene la parte numérica
                    const nuevoNumero = (parseInt(numero, 10) + 1).toString().padStart(4, '0'); // Incrementa el número
                    nuevaSerie = `${prefijo}-${nuevoNumero}`;
                }
            }
        }
        res.status(200).json({ num_serie: nuevaSerie });
    }
    catch (error) {
        console.error('Error al obtener la última serie:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor al obtener la última serie' });
    }
});
exports.obtenerUltimaSerie = obtenerUltimaSerie;
const getComprobanteventabyVentaID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idVenta } = req.params;
    try {
        const comprobante = yield comprobante_model_1.default.findOne({
            where: { id_venta: idVenta },
            include: [
                {
                    model: venta_model_1.default,
                    as: 'Venta',
                    include: [
                        { model: cliente_model_1.default, as: 'Cliente' }, // Incluir Cliente
                        { model: empleado_model_1.default, as: 'Empleado' } // Incluir Empleado
                    ]
                },
                { model: tipocomprobante_model_1.default, as: 'Tipocomprobante' },
                { model: notacredito_model_1.default, as: 'Notacredito' }
            ],
        });
        if (!comprobante) {
            res.status(404).json({ msg: 'Comprobante no encontrado' });
            return;
        }
        res.json(comprobante);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el comprobante' });
    }
});
exports.getComprobanteventabyVentaID = getComprobanteventabyVentaID;
const getComprobantesByTipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo } = req.params;
    try {
        const comprobantes = yield comprobante_model_1.default.findAll({
            include: [
                { model: venta_model_1.default, as: 'Venta' },
                { model: tipocomprobante_model_1.default, as: 'Tipocomprobante' },
                { model: notacredito_model_1.default, as: 'Notacredito' }
            ],
            where: {
                id_tipocomprobante: tipo
            },
            order: [['id', 'DESC']]
        });
        res.json(comprobantes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de comprobantes' });
    }
});
exports.getComprobantesByTipo = getComprobantesByTipo;
const obtenerResumenVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hoy = new Date();
        const inicioDia = new Date(Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0));
        const finDia = new Date(Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59));
        const inicioSemana = new Date(inicioDia);
        inicioSemana.setUTCDate(hoy.getUTCDate() - (hoy.getUTCDay() === 0 ? 6 : hoy.getUTCDay() - 1)); // Lunes de la semana actual
        const inicioMes = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), 1, 0, 0, 0));
        // Filtros para contar solo comprobantes emitidos de tipo 1 (Boleta) o 2 (Factura)
        const filtrosComprobante = {
            estado: 'Emitido',
            id_tipocomprobante: { [sequelize_1.Op.in]: [1, 2] } // Boleta y Factura
        };
        // Contar ventas del día
        const ventasDelDia = yield comprobante_model_1.default.count({
            where: filtrosComprobante,
            include: [
                {
                    model: venta_model_1.default,
                    as: "Venta",
                    where: {
                        fecha_venta: {
                            [sequelize_1.Op.between]: [inicioDia, finDia]
                        }
                    }
                }
            ]
        });
        // Contar ventas de la semana
        const ventasDeLaSemana = yield comprobante_model_1.default.count({
            where: filtrosComprobante,
            include: [
                {
                    model: venta_model_1.default,
                    as: "Venta",
                    where: {
                        fecha_venta: {
                            [sequelize_1.Op.between]: [inicioSemana, finDia] // Fin del día actual
                        }
                    }
                }
            ]
        });
        // Contar ventas del mes
        const ventasDelMes = yield comprobante_model_1.default.count({
            where: filtrosComprobante,
            include: [
                {
                    model: venta_model_1.default,
                    as: "Venta",
                    where: {
                        fecha_venta: {
                            [sequelize_1.Op.between]: [inicioMes, finDia] // Fin del día actual
                        }
                    }
                }
            ]
        });
        res.status(200).json({
            ventasDelDia,
            ventasDeLaSemana,
            ventasDelMes
        });
    }
    catch (error) {
        console.error("Error al obtener el resumen de ventas:", error);
        res.status(500).json({ mensaje: "Error al obtener el resumen de ventas." });
    }
});
exports.obtenerResumenVentas = obtenerResumenVentas;
const obtenerProductosMasVendidosSemana = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hoy = new Date();
        const inicioSemana = new Date(hoy);
        inicioSemana.setUTCDate(hoy.getUTCDate() - (hoy.getUTCDay() === 0 ? 6 : hoy.getUTCDay() - 1)); // Lunes de la semana actual
        inicioSemana.setUTCHours(0, 0, 0, 0);
        // Consultar los productos más vendidos en la última semana
        const productosMasVendidos = yield detalleventa_model_1.default.findAll({
            attributes: [
                "id_inventario",
                [sequelize_1.Sequelize.fn("SUM", sequelize_1.Sequelize.col("cantidad")), "total_vendido"]
            ],
            include: [
                {
                    model: inventario_model_1.default,
                    as: "Inventario",
                    include: [
                        {
                            model: producto_model_1.default,
                            as: "Producto",
                            include: [
                                { model: bebida_model_1.default, as: "Bebida", attributes: ["nombre"] }, // Si es Bebida
                                { model: alimento_model_1.default, as: "Alimento", attributes: ["nombre"] } // Si es Alimento
                            ]
                        }
                    ]
                }
            ],
            group: ["id_inventario", "Inventario.id", "Inventario->Producto.id", "Inventario->Producto->Bebida.id", "Inventario->Producto->Alimento.id"],
            having: sequelize_1.Sequelize.literal("total_vendido > 5"), // Solo incluir productos con más de 5 unidades vendidas
            order: [[sequelize_1.Sequelize.literal("total_vendido"), "DESC"]] // Ordenar por cantidad vendida descendente
        });
        // Formateamos los resultados para incluir el nombre correcto (Bebida o Alimento)
        const resultadoFinal = productosMasVendidos.map((item) => {
            var _a, _b;
            return ({
                id_inventario: item.id_inventario,
                total_vendido: item.getDataValue("total_vendido"),
                nombre: ((_a = item.Inventario.Producto.Bebida) === null || _a === void 0 ? void 0 : _a.nombre) || ((_b = item.Inventario.Producto.Alimento) === null || _b === void 0 ? void 0 : _b.nombre) || "Desconocido"
            });
        });
        res.status(200).json(resultadoFinal);
    }
    catch (error) {
        console.error("Error al obtener productos más vendidos de la semana:", error);
        res.status(500).json({ mensaje: "Error al obtener productos más vendidos." });
    }
});
exports.obtenerProductosMasVendidosSemana = obtenerProductosMasVendidosSemana;

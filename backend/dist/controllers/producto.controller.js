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
exports.deleteProducto = exports.updateProducto = exports.getProductoById = exports.getProductos = exports.createProducto = void 0;
const producto_model_1 = __importDefault(require("../models/producto.model"));
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
const unidadmedida_model_1 = __importDefault(require("../models/unidadmedida.model"));
const bebida_model_1 = __importDefault(require("../models/bebida.model"));
const alimento_model_1 = __importDefault(require("../models/alimento.model"));
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_categoria, id_unidadmedida, id_bebida, id_alimento } = req.body;
    try {
        // Crea un nuevo producto
        const nuevoProducto = yield producto_model_1.default.create({
            id_categoria,
            id_unidadmedida,
            id_bebida,
            id_alimento,
        });
        res.status(201).json(nuevoProducto);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error, comuníquese con soporte' });
    }
});
exports.createProducto = createProducto;
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield producto_model_1.default.findAll({
            include: [
                { model: categoria_model_1.default, as: 'Categoria' },
                { model: unidadmedida_model_1.default, as: 'UnidadMedida' },
                { model: bebida_model_1.default, as: 'Bebida' },
                { model: alimento_model_1.default, as: 'Alimento' }
            ],
        });
        res.json(productos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de productos' });
    }
});
exports.getProductos = getProductos;
const getProductoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProducto } = req.params;
    try {
        const producto = yield producto_model_1.default.findByPk(idProducto, {
            include: [
                { model: categoria_model_1.default, as: 'Categoria' },
                { model: unidadmedida_model_1.default, as: 'UnidadMedida' },
                { model: bebida_model_1.default, as: 'Bebida' },
                { model: alimento_model_1.default, as: 'Alimento' }
            ],
        });
        if (!producto) {
            res.status(404).json({ msg: 'Producto no encontrado' });
            return;
        }
        res.json(producto);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el producto' });
    }
});
exports.getProductoById = getProductoById;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProducto } = req.params; // Extraer idProducto de los parámetros de la URL
    const { id_categoria, id_unidadmedida, id_bebida, id_alimento } = req.body;
    try {
        const producto = yield producto_model_1.default.findByPk(idProducto); // Utiliza findByPk para buscar por clave primaria
        if (!producto) {
            res.status(404).json({ msg: `No existe un producto con el id ${idProducto}` });
            return;
        }
        // Actualizar el producto con los campos proporcionados en la solicitud
        if (id_categoria)
            producto.id_categoria = id_categoria;
        if (id_unidadmedida)
            producto.id_unidadmedida = id_unidadmedida;
        if (id_bebida)
            producto.id_bebida = id_bebida;
        if (id_alimento)
            producto.id_alimento = id_alimento;
        yield producto.save();
        res.json({ msg: 'El producto fue actualizado con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error, comuníquese con soporte' });
    }
});
exports.updateProducto = updateProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProducto } = req.params;
    try {
        const producto = yield producto_model_1.default.findByPk(idProducto);
        if (!producto) {
            res.status(404).json({ msg: 'Producto no encontrado' });
            return;
        }
        yield producto.destroy();
        res.json({ msg: 'Producto eliminado con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el producto' });
    }
});
exports.deleteProducto = deleteProducto;

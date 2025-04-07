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
exports.deleteUnidadMedida = exports.updateUnidadMedida = exports.getUnidadMedidaById = exports.getUnidadesMedida = exports.createUnidadMedida = void 0;
const unidadmedida_model_1 = __importDefault(require("../models/unidadmedida.model"));
const createUnidadMedida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion } = req.body;
    try {
        const unidadMedidaExiste = yield unidadmedida_model_1.default.findOne({ where: { descripcion } });
        if (unidadMedidaExiste) {
            res.status(400).json({ msg: 'La unidad de medida ya existe' });
            return;
        }
        const nuevaUnidadMedida = yield unidadmedida_model_1.default.create({
            descripcion,
        });
        res.status(201).json(nuevaUnidadMedida);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear la unidad de medida' });
    }
});
exports.createUnidadMedida = createUnidadMedida;
const getUnidadesMedida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unidadesMedida = yield unidadmedida_model_1.default.findAll();
        res.json(unidadesMedida);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener las unidades de medida' });
    }
});
exports.getUnidadesMedida = getUnidadesMedida;
const getUnidadMedidaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUnidadMedida } = req.params;
    try {
        const unidadMedida = yield unidadmedida_model_1.default.findByPk(idUnidadMedida);
        if (!unidadMedida) {
            res.status(404).json({ msg: 'Unidad de medida no encontrada' });
            return;
        }
        else {
            res.json(unidadMedida);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la unidad de medida' });
    }
});
exports.getUnidadMedidaById = getUnidadMedidaById;
const updateUnidadMedida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idUnidadMedida } = req.params;
    try {
        const unidadMedida = yield unidadmedida_model_1.default.findByPk(idUnidadMedida);
        if (unidadMedida) {
            yield unidadMedida.update(body);
            res.json({ msg: 'La unidad de medida fue actualizada con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe una unidad de medida con el id ${idUnidadMedida}` });
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar la unidad de medida' });
    }
});
exports.updateUnidadMedida = updateUnidadMedida;
const deleteUnidadMedida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUnidadMedida } = req.params;
    try {
        const unidadMedida = yield unidadmedida_model_1.default.findByPk(idUnidadMedida);
        if (unidadMedida) {
            yield unidadMedida.destroy();
            res.json({ msg: 'Unidad de medida eliminada correctamente' });
        }
        else {
            res.status(404).json({ msg: 'Unidad de medida no encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar la unidad de medida' });
    }
});
exports.deleteUnidadMedida = deleteUnidadMedida;

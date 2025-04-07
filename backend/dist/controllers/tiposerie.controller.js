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
exports.deleteTiposerie = exports.updateTiposerie = exports.getTiposerieById = exports.getTiposeries = exports.createTiposerie = void 0;
const tiposerie_model_1 = __importDefault(require("../models/tiposerie.model"));
const createTiposerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion } = req.body;
    try {
        const tiposerieExiste = yield tiposerie_model_1.default.findOne({ where: { descripcion } });
        if (tiposerieExiste) {
            res.status(400).json({ msg: 'El tipo de serie ya existe' });
            return;
        }
        const nuevaTiposerie = yield tiposerie_model_1.default.create({
            descripcion,
        });
        res.status(201).json(nuevaTiposerie);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el tipo de serie' });
    }
});
exports.createTiposerie = createTiposerie;
const getTiposeries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiposeries = yield tiposerie_model_1.default.findAll();
        res.json(tiposeries);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener los tipos de serie' });
    }
});
exports.getTiposeries = getTiposeries;
const getTiposerieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTiposerie } = req.params;
    try {
        const tiposerie = yield tiposerie_model_1.default.findByPk(idTiposerie);
        if (!tiposerie) {
            res.status(404).json({ msg: 'Tipo de serie no encontrado' });
            return;
        }
        else {
            res.json(tiposerie);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el tipo de serie' });
    }
});
exports.getTiposerieById = getTiposerieById;
const updateTiposerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idTiposerie } = req.params;
    try {
        const tiposerie = yield tiposerie_model_1.default.findByPk(idTiposerie);
        if (tiposerie) {
            yield tiposerie.update(body);
            res.json({ msg: 'El tipo de serie fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un tipo de serie con el id ${idTiposerie}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el tipo de serie' });
    }
});
exports.updateTiposerie = updateTiposerie;
const deleteTiposerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTiposerie } = req.params;
    try {
        const tiposerie = yield tiposerie_model_1.default.findByPk(idTiposerie);
        if (tiposerie) {
            yield tiposerie.destroy();
            res.json({ msg: 'Tipo de serie eliminado correctamente' });
        }
        else {
            res.status(404).json({ msg: 'Tipo de serie no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar el tipo de serie' });
    }
});
exports.deleteTiposerie = deleteTiposerie;

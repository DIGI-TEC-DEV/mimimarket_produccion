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
exports.deleteRol = exports.updateRol = exports.getRolById = exports.getRoles = exports.createRol = void 0;
const rol_model_1 = __importDefault(require("../models/rol.model")); // Asegúrate de que la ruta del modelo sea correcta
// Crear un nuevo rol
const createRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion } = req.body;
    try {
        // Verificar si el rol ya existe
        const rolExiste = yield rol_model_1.default.findOne({ where: { descripcion } });
        if (rolExiste) {
            res.status(400).json({ msg: "El rol ya existe" });
            return;
        }
        // Crear el nuevo rol
        const nuevoRol = yield rol_model_1.default.create({ descripcion });
        res.status(201).json(nuevoRol);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al crear el rol" });
    }
});
exports.createRol = createRol;
// Obtener todos los roles
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield rol_model_1.default.findAll();
        res.json(roles);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al obtener los roles" });
    }
});
exports.getRoles = getRoles;
// Obtener un rol por su ID
const getRolById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRol } = req.params;
    try {
        const rol = yield rol_model_1.default.findByPk(idRol);
        if (!rol) {
            res.status(404).json({ msg: "Rol no encontrado" });
            return;
        }
        else {
            res.json(rol);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener el rol" });
    }
});
exports.getRolById = getRolById;
// Actualizar un rol
const updateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idRol } = req.params;
    try {
        const rol = yield rol_model_1.default.findByPk(idRol);
        if (rol) {
            yield rol.update(body);
            res.json({ msg: "El rol fue actualizado con éxito" });
        }
        else {
            res.status(404).json({ msg: `No existe un rol con el id ${idRol}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al actualizar el rol" });
    }
});
exports.updateRol = updateRol;
// Eliminar un rol
const deleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRol } = req.params;
    try {
        const rol = yield rol_model_1.default.findByPk(idRol);
        if (rol) {
            yield rol.destroy();
            res.json({ msg: "Rol eliminado correctamente" });
        }
        else {
            res.status(404).json({ msg: "Rol no encontrado" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al eliminar el rol" });
    }
});
exports.deleteRol = deleteRol;

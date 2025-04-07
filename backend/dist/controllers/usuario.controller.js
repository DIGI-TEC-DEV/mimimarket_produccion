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
exports.activarUsuario = exports.deleteUsuario = exports.updateUsuario = exports.getUsuarioById = exports.getUsuarios = exports.createUsuario = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const rol_model_1 = __importDefault(require("../models/rol.model"));
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_empleado, id_rol, usuario, password, estado } = req.body;
    try {
        const existingUser = yield usuario_model_1.default.findOne({ where: { usuario } });
        if (existingUser) {
            res.status(400).json({ msg: 'El usuario ya existe' });
            return;
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const nuevoUsuario = yield usuario_model_1.default.create({
            id_empleado,
            id_rol,
            usuario,
            password: hashedPassword,
            estado: estado || 'activo' // Si no se proporciona, por defecto será "Activo"
        });
        res.status(201).json(nuevoUsuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error, comuníquese con soporte' });
    }
});
exports.createUsuario = createUsuario;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_model_1.default.findAll({
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: rol_model_1.default, as: 'Rol' },
            ],
            attributes: ['id', 'usuario', 'password', 'estado', 'id_empleado', 'id_rol'] // 🔥 Agregamos password
        });
        res.json(usuarios);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de usuarios' });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUsuario } = req.params;
    try {
        const usuario = yield usuario_model_1.default.findByPk(idUsuario, {
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: rol_model_1.default, as: 'Rol' },
            ],
            attributes: ['id', 'usuario', 'password', 'estado', 'id_empleado', 'id_rol'] // 🔥 Agregamos password
        });
        if (!usuario) {
            res.status(404).json({ msg: 'Usuario no encontrado' });
            return;
        }
        res.json(usuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el usuario' });
    }
});
exports.getUsuarioById = getUsuarioById;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, usuario, password, id_empleado, id_rol, estado } = req.body;
    if (!id) {
        res.status(400).json({ msg: "El ID del usuario es obligatorio" });
        return;
    }
    try {
        const user = yield usuario_model_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ msg: `No existe un usuario con el id ${id}` });
            return;
        }
        let cambios = false;
        if (password) { // Si se envía un password, lo encripta y actualiza
            const saltRounds = 10;
            user.password = yield bcrypt_1.default.hash(password, saltRounds);
            cambios = true;
        }
        if (usuario && usuario !== user.usuario) {
            user.usuario = usuario;
            cambios = true;
        }
        if (id_empleado && id_empleado !== user.id_empleado) {
            user.id_empleado = id_empleado;
            cambios = true;
        }
        if (id_rol && id_rol !== user.id_rol) {
            user.id_rol = id_rol;
            cambios = true;
        }
        if (estado && estado !== user.estado) {
            user.estado = estado;
            cambios = true;
        }
        if (!cambios) {
            res.json({ msg: "No se realizaron cambios" });
            return;
        }
        yield user.save();
        res.json({ msg: "El usuario fue actualizado con éxito" });
    }
    catch (error) {
        console.error("Error en updateUsuario:", error);
        res.status(500).json({ msg: "Ocurrió un error, comuníquese con soporte" });
    }
});
exports.updateUsuario = updateUsuario;
// Soft delete - Cambia el estado en lugar de eliminarlo
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUsuario } = req.params;
    try {
        const usuario = yield usuario_model_1.default.findByPk(idUsuario);
        if (!usuario) {
            res.status(404).json({ msg: 'Usuario no encontrado' });
            return;
        }
        usuario.estado = 'inactivo'; // Soft delete
        yield usuario.save();
        res.json({ msg: 'Usuario desactivado con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al desactivar el usuario' });
    }
});
exports.deleteUsuario = deleteUsuario;
// Soft delete - Cambia el estado en lugar de eliminarlo
const activarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUsuario } = req.params;
    try {
        const usuario = yield usuario_model_1.default.findByPk(idUsuario);
        if (!usuario) {
            res.status(404).json({ msg: 'Usuario no encontrado' });
            return;
        }
        usuario.estado = 'activo'; // Soft delete
        yield usuario.save();
        res.json({ msg: 'Usuario desactivado con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al desactivar el usuario' });
    }
});
exports.activarUsuario = activarUsuario;

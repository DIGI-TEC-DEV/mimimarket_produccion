"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_controller_1 = require("../controllers/rol.controller");
const RolRouter = (0, express_1.Router)();
RolRouter.post("/", rol_controller_1.createRol); // Crear un nuevo rol
RolRouter.get("/", rol_controller_1.getRoles); // Obtener todos los roles
RolRouter.get("/:idRol", rol_controller_1.getRolById); // Obtener un rol por ID
RolRouter.put("/:idRol", rol_controller_1.updateRol); // Actualizar un rol
RolRouter.delete("/:idRol", rol_controller_1.deleteRol); // Eliminar un rol
exports.default = RolRouter;

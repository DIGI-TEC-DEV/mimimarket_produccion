"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bebida_controller_1 = require("../controllers/bebida.controller");
const BebidasRouter = (0, express_1.Router)();
BebidasRouter.post('/', bebida_controller_1.createBebida);
BebidasRouter.get('/', bebida_controller_1.getBebidas);
BebidasRouter.get('/:idBebida', bebida_controller_1.getBebidaById);
BebidasRouter.put('/:idBebida', bebida_controller_1.updateBebida);
BebidasRouter.delete('/:idBebida', bebida_controller_1.deleteBebida);
exports.default = BebidasRouter;

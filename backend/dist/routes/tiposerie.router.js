"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiposerie_controller_1 = require("../controllers/tiposerie.controller");
const TipoSerieRouter = (0, express_1.Router)();
TipoSerieRouter.post('/', tiposerie_controller_1.createTiposerie);
TipoSerieRouter.get('/', tiposerie_controller_1.getTiposeries);
TipoSerieRouter.get('/:idTipoSerie', tiposerie_controller_1.getTiposerieById);
TipoSerieRouter.put('/:idTipoSerie', tiposerie_controller_1.updateTiposerie);
TipoSerieRouter.delete('/:idTipoSerie', tiposerie_controller_1.deleteTiposerie);
exports.default = TipoSerieRouter;

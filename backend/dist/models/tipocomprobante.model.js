"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const tiposerie_model_1 = __importDefault(require("./tiposerie.model"));
const Tipocomprobante = connection_db_1.default.define('Tipocomprobante', {
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_tiposerie: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    timestamps: false,
    modelName: 'Tipocomprobante',
    tableName: 'tipocomprobante',
});
Tipocomprobante.belongsTo(tiposerie_model_1.default, { foreignKey: 'id_tiposerie', as: 'Tiposerie' });
exports.default = Tipocomprobante;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const venta_model_1 = __importDefault(require("./venta.model"));
const inventario_model_1 = __importDefault(require("./inventario.model"));
const DetalleVenta = connection_db_1.default.define("DetalleVenta", {
    id_venta: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_inventario: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    precio_unitario: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    subtotal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
}, {
    timestamps: false,
    modelName: "DetalleVenta",
    tableName: "detalleventa",
});
DetalleVenta.belongsTo(venta_model_1.default, { foreignKey: "id_venta", as: "Venta" });
DetalleVenta.belongsTo(inventario_model_1.default, { foreignKey: "id_inventario", as: "Inventario" });
exports.default = DetalleVenta;

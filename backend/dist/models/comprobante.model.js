"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const notacredito_model_1 = __importDefault(require("./notacredito.model"));
const venta_model_1 = __importDefault(require("./venta.model"));
const tipocomprobante_model_1 = __importDefault(require("./tipocomprobante.model"));
const Comprobante = connection_db_1.default.define('Comprobante', {
    id_venta: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    igv: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    descuento: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    id_tipocomprobante: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    num_serie: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    razon_anulacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_notacredito: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    timestamps: false,
    modelName: 'Comprobante',
    tableName: 'comprobante',
});
Comprobante.belongsTo(tipocomprobante_model_1.default, { foreignKey: 'id_tipocomprobante', as: 'Tipocomprobante' });
Comprobante.belongsTo(venta_model_1.default, { foreignKey: 'id_venta', as: 'Venta' });
Comprobante.belongsTo(notacredito_model_1.default, { foreignKey: 'id_notacredito', as: 'Notacredito' });
exports.default = Comprobante;

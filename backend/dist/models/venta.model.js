"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const empleado_model_1 = __importDefault(require("./empleado.model"));
const cliente_model_1 = __importDefault(require("./cliente.model"));
const Venta = connection_db_1.default.define('Venta', {
    id_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: cliente_model_1.default,
            key: 'id_cliente'
        }
    },
    id_empleado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: empleado_model_1.default,
            key: 'id_empleado'
        }
    },
    fecha_venta: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW, // Para insertar la fecha actual por defecto
    },
    pago: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'venta',
});
// Establecer relaciones
Venta.belongsTo(cliente_model_1.default, { foreignKey: 'id_cliente', as: 'Cliente' });
Venta.belongsTo(empleado_model_1.default, { foreignKey: 'id_empleado', as: 'Empleado' });
exports.default = Venta;

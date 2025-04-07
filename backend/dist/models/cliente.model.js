"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const Cliente = connection_db_1.default.define("Cliente", {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    dni: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    ruc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    razon_social: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    rubro: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'cliente',
});
exports.default = Cliente;

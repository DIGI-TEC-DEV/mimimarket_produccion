"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const categoria_model_1 = __importDefault(require("./categoria.model"));
const unidadmedida_model_1 = __importDefault(require("./unidadmedida.model"));
const bebida_model_1 = __importDefault(require("./bebida.model"));
const alimento_model_1 = __importDefault(require("./alimento.model"));
const Producto = connection_db_1.default.define("Producto", {
    id_categoria: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_unidadmedida: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_bebida: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_alimento: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    timestamps: false,
    modelName: "Producto",
    tableName: "producto",
});
Producto.belongsTo(categoria_model_1.default, { foreignKey: "id_categoria", as: "Categoria" });
Producto.belongsTo(unidadmedida_model_1.default, { foreignKey: "id_unidadmedida", as: "UnidadMedida" });
Producto.belongsTo(bebida_model_1.default, { foreignKey: "id_bebida", as: "Bebida" });
Producto.belongsTo(alimento_model_1.default, { foreignKey: "id_alimento", as: "Alimento" });
exports.default = Producto;

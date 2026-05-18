"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const serverless_express_1 = __importDefault(require("@vendia/serverless-express"));
const server_1 = require("./presentation/server");
const router_1 = require("./presentation/router");
const envs_1 = require("./config/envs");
const server = new server_1.Server({
    port: envs_1.envs.PORT,
    public_path: 'public',
    routes: router_1.AppRoutes.routes,
});
exports.handler = (0, serverless_express_1.default)({ app: server.configure() });

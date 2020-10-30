"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const app_1 = __importDefault(require("./app"));
const server = app_1.default.listen(config_1.default.get('http.port'), config_1.default.get('http.ipAddress'), () => {
    console.log(`Server listening on 0.0.0.0:8123`);
});
//# sourceMappingURL=index.js.map
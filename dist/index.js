"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const app_1 = __importDefault(require("./app"));
const ipAddress = config_1.default.get('http.ipAddress');
const port = config_1.default.get('http.port');
const server = app_1.default.listen(port, ipAddress, () => {
    console.log(`Server listening on ${ipAddress}:${port}`);
});
//# sourceMappingURL=index.js.map
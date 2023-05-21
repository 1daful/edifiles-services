"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAuth = exports.Recommender = exports.Search = exports.Mailer = void 0;
var Mailer_1 = require("./api/Email/Mailer");
Object.defineProperty(exports, "Mailer", { enumerable: true, get: function () { return Mailer_1.Mailer; } });
var Search_1 = require("./api/Search/Search");
Object.defineProperty(exports, "Search", { enumerable: true, get: function () { return Search_1.Search; } });
var Recommender_1 = require("./api/recommendation/Recommender");
Object.defineProperty(exports, "Recommender", { enumerable: true, get: function () { return Recommender_1.Recommender; } });
var Auth_1 = require("./api/auth/Auth");
Object.defineProperty(exports, "EAuth", { enumerable: true, get: function () { return Auth_1.EAuth; } });
__exportStar(require("./utility/Types"), exports);
//# sourceMappingURL=index.js.map
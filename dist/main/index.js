"use strict";
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
//# sourceMappingURL=index.js.map
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
exports.SDKClient = exports.RestClient = exports.cacheExchange = exports.fetchExchange = exports.GraphqlClient = exports.parseQuery = exports.getUrl = exports.joinObject = exports.isType = exports.isObject = exports.Resource = exports.Response = exports.Axiosi = exports.SupabaseRepo = exports.Repository = exports.EdiStorage = exports.EAuth = exports.Recommender = exports.Search = exports.Mailer = exports.Scheduler = exports.Callback = void 0;
var Callback_1 = require("./api/Callback");
Object.defineProperty(exports, "Callback", { enumerable: true, get: function () { return Callback_1.Callback; } });
var Schedule_1 = require("./api/Schedule/Schedule");
Object.defineProperty(exports, "Scheduler", { enumerable: true, get: function () { return Schedule_1.Scheduler; } });
var Mailer_1 = require("./api/Email/Mailer");
Object.defineProperty(exports, "Mailer", { enumerable: true, get: function () { return Mailer_1.Mailer; } });
var Search_1 = require("./api/Search/Search");
Object.defineProperty(exports, "Search", { enumerable: true, get: function () { return Search_1.Search; } });
var Recommender_1 = require("./api/recommendation/Recommender");
Object.defineProperty(exports, "Recommender", { enumerable: true, get: function () { return Recommender_1.Recommender; } });
var Auth_1 = require("./api/auth/Auth");
Object.defineProperty(exports, "EAuth", { enumerable: true, get: function () { return Auth_1.EAuth; } });
var storage_1 = require("./api/storage/storage");
Object.defineProperty(exports, "EdiStorage", { enumerable: true, get: function () { return storage_1.EdiStorage; } });
var Repository_1 = require("./model/Repository");
Object.defineProperty(exports, "Repository", { enumerable: true, get: function () { return Repository_1.Repository; } });
var SupabaseRepo_1 = require("./model/SupabaseRepo");
Object.defineProperty(exports, "SupabaseRepo", { enumerable: true, get: function () { return SupabaseRepo_1.SupabaseRepo; } });
var Axiosi_1 = require("./api/Axiosi");
Object.defineProperty(exports, "Axiosi", { enumerable: true, get: function () { return Axiosi_1.Axiosi; } });
__exportStar(require("./utility/Types"), exports);
var Response_1 = require("./api/Response");
Object.defineProperty(exports, "Response", { enumerable: true, get: function () { return Response_1.Response; } });
var Resource_1 = require("./api/Resource");
Object.defineProperty(exports, "Resource", { enumerable: true, get: function () { return Resource_1.Resource; } });
var Utility_1 = require("./utility/Utility");
Object.defineProperty(exports, "isObject", { enumerable: true, get: function () { return Utility_1.isObject; } });
Object.defineProperty(exports, "isType", { enumerable: true, get: function () { return Utility_1.isType; } });
Object.defineProperty(exports, "joinObject", { enumerable: true, get: function () { return Utility_1.joinObject; } });
Object.defineProperty(exports, "getUrl", { enumerable: true, get: function () { return Utility_1.getUrl; } });
var Query_1 = require("./utility/Query");
Object.defineProperty(exports, "parseQuery", { enumerable: true, get: function () { return Query_1.parseQuery; } });
var GraphqlClient_1 = require("./clients/GraphqlClient");
Object.defineProperty(exports, "GraphqlClient", { enumerable: true, get: function () { return GraphqlClient_1.GraphqlClient; } });
Object.defineProperty(exports, "fetchExchange", { enumerable: true, get: function () { return GraphqlClient_1.fetchExchange; } });
Object.defineProperty(exports, "cacheExchange", { enumerable: true, get: function () { return GraphqlClient_1.cacheExchange; } });
var RestClient_1 = require("./clients/RestClient");
Object.defineProperty(exports, "RestClient", { enumerable: true, get: function () { return RestClient_1.RestClient; } });
var SDKClient_1 = require("./clients/SDKClient");
Object.defineProperty(exports, "SDKClient", { enumerable: true, get: function () { return SDKClient_1.SDKClient; } });
//# sourceMappingURL=index.js.map
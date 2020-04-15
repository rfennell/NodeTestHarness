"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var webApi = require("azure-devops-node-api/WebApi");
function getMsg(commitId) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var token, authHandler, vsts, buildApi, build, cs;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                token = "3v5xiiwlgg7ffsqd3inhi65fngsn3bhoxnlnebhtqvuh6vyiszya";
                                authHandler = webApi.getPersonalAccessTokenHandler(token);
                                vsts = new webApi.WebApi("https://dev.azure.com/richardfennell", authHandler);
                                return [4 /*yield*/, vsts.getBuildApi()];
                            case 1:
                                buildApi = _a.sent();
                                return [4 /*yield*/, buildApi.getBuild("GitHub", 5402)];
                            case 2:
                                build = _a.sent();
                                if (!build.triggerInfo["pr.title"]) return [3 /*break*/, 3];
                                console.log("trigger - " + build.triggerInfo["pr.title"]);
                                return [3 /*break*/, 5];
                            case 3: return [4 /*yield*/, buildApi.getBuildChanges("GitHub", 5404)];
                            case 4:
                                cs = _a.sent();
                                console.log(cs);
                                if (cs.length > 0) {
                                    console.log(cs[cs.length - 1].message);
                                }
                                _a.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
console.log(getMsg("81e9401dbf6501e25c9ab3d5da561fbcb46e87c0"));

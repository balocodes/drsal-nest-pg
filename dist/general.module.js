"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralModule = void 0;
const common_1 = require("@nestjs/common");
const general_service_1 = require("./general.service");
const general_controller_1 = require("./general.controller");
let GeneralModule = class GeneralModule {
};
GeneralModule = __decorate([
    common_1.Module({
        providers: [general_service_1.GeneralService],
        controllers: [general_controller_1.GeneralController]
    })
], GeneralModule);
exports.GeneralModule = GeneralModule;
//# sourceMappingURL=general.module.js.map
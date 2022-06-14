"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const general_controller_1 = require("./general.controller");
describe('GeneralController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [general_controller_1.GeneralController],
        }).compile();
        controller = module.get(general_controller_1.GeneralController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=general.controller.spec.js.map
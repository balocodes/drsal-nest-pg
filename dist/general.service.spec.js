"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const general_service_1 = require("./general.service");
describe('GeneralService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [general_service_1.GeneralService],
        }).compile();
        service = module.get(general_service_1.GeneralService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=general.service.spec.js.map
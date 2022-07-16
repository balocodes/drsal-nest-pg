"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterOptions = void 0;
class FilterOptions {
    constructor() {
        if (this.filter) {
            this.whereClause = JSON.parse(this.filter);
        }
    }
}
exports.FilterOptions = FilterOptions;
//# sourceMappingURL=data-handler.js.map
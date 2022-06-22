"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericResponse = exports.GeneralResponse = exports.GeneralService = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("./utils/enums");
const typeorm_1 = require("typeorm");
class GeneralService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll(query) {
        var _a;
        if (!this.repo) {
            throw Error("Must set repo");
        }
        query = Object.assign(Object.assign({}, query), { limit: query.limit || 10, page: query.page || 0, dateField: query.dateField || "created", order: query.order || "DESC", orderField: query.orderField || "created", select: typeof query.select === "string"
                ? JSON.parse(query.select)
                : query.select, whereClause: typeof query.whereClause === "string"
                ? JSON.parse(query.whereClause)
                : query.whereClause });
        if ((!query.select || query.select.length < 1) && !query.searchString) {
            let dateFilter = {};
            if (query.startDate) {
                dateFilter = {
                    [query.dateField]: (0, typeorm_1.Between)(query.startDate, query.endDate),
                };
            }
            return this.repo.find({
                where: Object.assign(Object.assign({}, query.whereClause), dateFilter),
                take: query.limit,
                skip: query.limit * query.page,
                loadEagerRelations: true,
                order: {
                    [query.orderField || "created"]: query.order,
                },
            });
        }
        const x = this.repo.createQueryBuilder();
        x.take(query.limit)
            .skip(query.limit * query.page)
            .select(query.select)
            .where(Object.assign({}, query.whereClause));
        if ((_a = query.searchString) === null || _a === void 0 ? void 0 : _a.trim()) {
            x.addSelect(`SIMILARITY(slug, '${query.searchString.trim()}')`, "score").andWhere(`SIMILARITY(slug, '${query.searchString.trim()}') > 0.1 `);
        }
        if (query.startDate) {
            x.andWhere(query.dateField || query.startDate, (0, typeorm_1.Between)(query.startDate, query.endDate));
        }
        if (query.searchString) {
            x.orderBy("score", "DESC");
        }
        if (query.order) {
            x.addOrderBy(query.orderField, query.order);
        }
        return this.resultHandler(x.getMany(), new enums_1.ResponseMessage("read", this.repo.metadata.name));
    }
    findOne(id) {
        return this.resultHandler(this.repo.findOne(id), new enums_1.ResponseMessage("read-single", this.repo.metadata.name));
    }
    create(data) {
        return this.resultHandler(this.repo.save(data), new enums_1.ResponseMessage("add", this.repo.metadata.name));
    }
    update(data) {
        if (!data.id) {
            throw Error("Id required to update data");
        }
        return this.resultHandler(this.repo.save(data), new enums_1.ResponseMessage("update", this.repo.metadata.name));
    }
    remove(id) {
        return this.resultHandler(this.repo.softDelete(id), new enums_1.ResponseMessage("delete", this.repo.metadata.name));
    }
    resultHandler(query, responseMessage) {
        return query
            .then((val) => {
            return {
                result: val,
                message: responseMessage.message.SUCCESS,
                error: false,
            };
        })
            .catch((e) => {
            console.log(e);
            return {
                result: null,
                message: responseMessage.message.ERROR,
                error: true,
            };
        });
    }
}
exports.GeneralService = GeneralService;
class GeneralResponse {
}
exports.GeneralResponse = GeneralResponse;
const GenericResponse = (dataType) => (dataDto) => (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(GeneralResponse, dataDto), (0, swagger_1.ApiOkResponse)({
    schema: {
        allOf: [
            { $ref: (0, swagger_1.getSchemaPath)(GeneralResponse) },
            {
                properties: {
                    result: {
                        type: dataType,
                        items: { $ref: (0, swagger_1.getSchemaPath)(dataDto) },
                    },
                    error: {
                        type: "boolean",
                    },
                    message: {
                        type: enums_1.ResponseMessage["message"],
                    },
                },
            },
        ],
    },
}));
exports.GenericResponse = GenericResponse;
//# sourceMappingURL=general.service.js.map
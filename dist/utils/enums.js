"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMessage = exports.GuidelineType = exports.DrugSource = exports.BodyPart = exports.Sex = void 0;
var Sex;
(function (Sex) {
    Sex["MALE"] = "Male";
    Sex["FEMALE"] = "Female";
    Sex["NONE"] = "";
})(Sex = exports.Sex || (exports.Sex = {}));
var BodyPart;
(function (BodyPart) {
    BodyPart["HEAD"] = "head";
    BodyPart["NECK"] = "neck";
    BodyPart["LEFT_HAND"] = "left-hand";
    BodyPart["RIGHT_HAND"] = "right-hand";
    BodyPart["HAND"] = "hand";
    BodyPart["CHEST"] = "chest";
    BodyPart["ABDOMEN"] = "abdomen";
    BodyPart["KNEE"] = "knee";
    BodyPart["THIGH"] = "thigh";
    BodyPart["WAIST"] = "waist";
    BodyPart["LEFT_LEG"] = "left-leg";
    BodyPart["RIGHT_LEG"] = "right-leg";
    BodyPart["LEG"] = "leg";
    BodyPart["FOOT"] = "foot";
    BodyPart["NONE"] = "";
})(BodyPart = exports.BodyPart || (exports.BodyPart = {}));
var DrugSource;
(function (DrugSource) {
    DrugSource["GUIDELINE"] = "Guideline";
    DrugSource["ADJUVANT"] = "Adjuvant";
})(DrugSource = exports.DrugSource || (exports.DrugSource = {}));
var GuidelineType;
(function (GuidelineType) {
    GuidelineType["GUIDELINE"] = "Guideline";
    GuidelineType["ADJUVANT"] = "Adjuvant";
})(GuidelineType = exports.GuidelineType || (exports.GuidelineType = {}));
class ResponseMessage {
    constructor(action, entityName) {
        this.action = action;
        this.entityName = entityName;
    }
    get message() {
        switch (this.action) {
            case 'add':
                return {
                    ERROR: `Could not create ${this.entityName}`,
                    SUCCESS: `Created ${this.entityName}`,
                };
            case 'update':
                return {
                    ERROR: `Could not update ${this.entityName}`,
                    SUCCESS: `Updated ${this.entityName}`,
                };
            case 'delete':
                return {
                    ERROR: `Could not delete ${this.entityName}`,
                    SUCCESS: `Deleted ${this.entityName}`,
                };
            case 'read-single':
                return {
                    ERROR: `Could not fetch the ${this.entityName}`,
                    SUCCESS: `Fetched a ${this.entityName}`,
                };
            case 'read':
                return {
                    ERROR: `Could not fetch ${this.entityName}`,
                    SUCCESS: `Fetched ${this.entityName}`,
                };
            default:
                return {
                    ERROR: `Failed`,
                    SUCCESS: `Success`,
                };
        }
    }
}
exports.ResponseMessage = ResponseMessage;
//# sourceMappingURL=enums.js.map
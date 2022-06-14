export declare enum Sex {
    MALE = "Male",
    FEMALE = "Female",
    NONE = ""
}
export declare enum BodyPart {
    HEAD = "head",
    NECK = "neck",
    LEFT_HAND = "left-hand",
    RIGHT_HAND = "right-hand",
    HAND = "hand",
    CHEST = "chest",
    ABDOMEN = "abdomen",
    KNEE = "knee",
    THIGH = "thigh",
    WAIST = "waist",
    LEFT_LEG = "left-leg",
    RIGHT_LEG = "right-leg",
    LEG = "leg",
    FOOT = "foot",
    NONE = ""
}
export declare enum DrugSource {
    GUIDELINE = "Guideline",
    ADJUVANT = "Adjuvant"
}
export declare enum GuidelineType {
    GUIDELINE = "Guideline",
    ADJUVANT = "Adjuvant"
}
export declare class ResponseMessage {
    private action;
    private entityName;
    constructor(action: 'add' | 'update' | 'delete' | 'read' | 'read-single', entityName: any);
    get message(): {
        ERROR: string;
        SUCCESS: string;
    };
}

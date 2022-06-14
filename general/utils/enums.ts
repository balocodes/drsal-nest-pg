export enum Sex {
  MALE = 'Male',
  FEMALE = 'Female',
  NONE = '',
}

export enum BodyPart {
  HEAD = 'head',
  NECK = 'neck',
  LEFT_HAND = 'left-hand',
  RIGHT_HAND = 'right-hand',
  HAND = 'hand',
  CHEST = 'chest',
  ABDOMEN = 'abdomen',
  KNEE = 'knee',
  THIGH = 'thigh',
  WAIST = 'waist',
  LEFT_LEG = 'left-leg',
  RIGHT_LEG = 'right-leg',
  LEG = 'leg',
  FOOT = 'foot',
  NONE = '',
}

export enum DrugSource {
  GUIDELINE = 'Guideline',
  ADJUVANT = 'Adjuvant',
}

export enum GuidelineType {
  GUIDELINE = 'Guideline',
  ADJUVANT = 'Adjuvant',
}

export class ResponseMessage {
  constructor(
    private action: 'add' | 'update' | 'delete' | 'read' | 'read-single',
    private entityName,
  ) {}

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

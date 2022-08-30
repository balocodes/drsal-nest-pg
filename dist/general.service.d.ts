import { Type } from "@nestjs/common";
import { ResponseMessage } from "./utils/enums";
import { DeepPartial, Repository, UpdateResult } from "typeorm";
export declare class GeneralService<IEntity> {
    private repo;
    constructor(repo: Repository<IEntity>);
    findAll(query: GeneralFilterOptions<IEntity>): Promise<{
        result: null;
        message: string;
        error: boolean;
    } | {
        result: IEntity[];
        message: string;
        error: boolean;
    }>;
    findOne(id: any): Promise<{
        result: null;
        message: string;
        error: boolean;
    } | {
        result: IEntity;
        message: string;
        error: boolean;
    }>;
    create(data: DeepPartial<IEntity>): Promise<{
        result: null;
        message: string;
        error: boolean;
    } | {
        result: DeepPartial<IEntity> & IEntity;
        message: string;
        error: boolean;
    }>;
    update(data: DeepPartial<IEntity>): Promise<{
        result: null;
        message: string;
        error: boolean;
    } | {
        result: DeepPartial<IEntity> & IEntity;
        message: string;
        error: boolean;
    }>;
    remove(id: number): Promise<{
        result: null;
        message: string;
        error: boolean;
    } | {
        result: UpdateResult;
        message: string;
        error: boolean;
    }>;
    resultHandler<T>(query: Promise<IEntity[] | IEntity | UpdateResult | (DeepPartial<IEntity> & IEntity)>, responseMessage: ResponseMessage): Promise<{
        result: T;
        message: string;
        error: boolean;
    } | {
        result: null;
        message: string;
        error: boolean;
    }>;
}
export interface GeneralFilterOptions<T> {
    limit?: number;
    page?: number;
    startDate?: string;
    endDate?: string;
    dateField?: string;
    searchString?: string;
    filter?: Record<string, any> | string;
    select?: (keyof T)[] | string;
    orderField?: string;
    order?: "DESC" | "ASC";
    distinctOn?: string[];
    precision?: number;
}
export declare class GeneralResponse<T> {
    result: T;
    message: ResponseMessage["message"];
    error: boolean;
}
export declare const GenericResponse: (dataType: any) => <DataDto extends Type<unknown>>(dataDto: DataDto) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;

import { Type } from '@nestjs/common';
import { ResponseMessage } from './utils/enums';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
export declare class GeneralService<IEntity> {
    private repo;
    constructor(repo: Repository<IEntity>);
    findAll(query: GeneralFilterOptions<IEntity>): any;
    findOne(id: any): any;
    create(data: DeepPartial<IEntity>): any;
    update(data: DeepPartial<IEntity>): any;
    remove(id: number): any;
    resultHandler(query: Promise<UpdateResult | Promise<DeepPartial<IEntity> & IEntity>> | Promise<IEntity> | Promise<IEntity[]>, responseMessage: ResponseMessage): any;
}
export interface GeneralFilterOptions<T> {
    limit?: number;
    page?: number;
    startDate?: string;
    endDate?: string;
    dateField?: string;
    searchString?: string;
    whereClause?: Record<string, any> | string;
    select?: (keyof T)[] | string;
    orderField?: string;
    order?: 'DESC' | 'ASC';
}
export declare class GeneralResponse<T> {
    result: T;
    message: ResponseMessage['message'];
    error: boolean;
}
export declare const GenericResponse: (dataType: any) => <DataDto extends Type<unknown>>(dataDto: DataDto) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;

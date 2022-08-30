import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { ResponseMessage } from "./utils/enums";
import { DeepPartial, Repository, UpdateResult } from "typeorm";
import { Between } from "typeorm/find-options/operator/Between";

export class GeneralService<IEntity> {
  constructor(private repo: Repository<IEntity>) {}

  findAll(query: GeneralFilterOptions<IEntity>) {
    if (!this.repo) {
      throw Error("Must set repo");
    }

    query = {
      ...query,
      limit: query.limit || 10,
      page: query.page || 0,
      dateField: query.dateField || "created",
      order: query.order || "DESC",
      orderField: query.orderField || "created",
      select:
        typeof query.select === "string"
          ? JSON.parse(query.select)
          : query.select,
      filter:
        typeof query.filter === "string"
          ? JSON.parse(query.filter)
          : query.filter,
    };

    if ((!query.select || query.select.length < 1) && !query.searchString) {
      let dateFilter = {};
      if (query.startDate) {
        dateFilter = {
          [query.dateField]: Between(query.startDate, query.endDate),
        };
      }

      return this.resultHandler<IEntity[]>(
        this.repo.find({
          where: { ...(query.filter as Record<string, any>), ...dateFilter },
          take: query.limit,
          skip: query.limit * query.page,
          loadEagerRelations: true,
          order: {
            [(query.orderField as string) || "created"]: query.order,
          } as any,
        }),
        new ResponseMessage("read", this.repo.metadata.name)
      );
    }

    const x = this.repo.createQueryBuilder();
    x.take(query.limit)
      .skip(query.limit * query.page)
      .select(query.select as string[])
      .where({ ...(query.filter as Record<string, any>) })
      .distinctOn(query.distinctOn || []);

    if (query.searchString?.trim()) {
      x.addSelect(
        `SIMILARITY(slug, '${query.searchString.trim()}')`,
        "score"
      ).andWhere(
        `SIMILARITY(slug, '${query.searchString.trim()}') > ${
          String(query.precision) || "0.1"
        } `
      );
    }

    if (query.startDate) {
      x.andWhere(
        query.dateField || query.startDate,
        Between(query.startDate, query.endDate)
      );
    }

    if (query.searchString) {
      x.orderBy("score", "DESC");
    }

    if (query.order) {
      x.addOrderBy(query.orderField, query.order);
    }

    return this.resultHandler<IEntity[]>(
      x.getMany(),
      new ResponseMessage("read", this.repo.metadata.name)
    );
  }

  findOne(id) {
    return this.resultHandler<IEntity>(
      this.repo.findOne(id),
      new ResponseMessage("read-single", this.repo.metadata.name)
    );
  }

  create(data: DeepPartial<IEntity>) {
    return this.resultHandler<DeepPartial<IEntity> & IEntity>(
      this.repo.save(data),
      new ResponseMessage("add", this.repo.metadata.name)
    );
  }

  update(data: DeepPartial<IEntity>) {
    if (!(data as any).id) {
      throw Error("Id required to update data");
    }
    return this.resultHandler<DeepPartial<IEntity> & IEntity>(
      this.repo.save(data),
      new ResponseMessage("update", this.repo.metadata.name)
    );
  }

  remove(id: number) {
    return this.resultHandler<UpdateResult>(
      this.repo.softDelete(id),
      new ResponseMessage("delete", this.repo.metadata.name)
    );
  }

  resultHandler<T>(
    query: Promise<
      IEntity[] | IEntity | UpdateResult | (DeepPartial<IEntity> & IEntity)
    >,
    responseMessage: ResponseMessage
  ): Promise<
    | { result: T; message: string; error: boolean }
    | { result: null; message: string; error: boolean }
  > {
    return query
      .then((val) => {
        return {
          result: val as any as T,
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

export class GeneralResponse<T> {
  result: T;
  message: ResponseMessage["message"];
  error: boolean;
}

export const GenericResponse =
  (dataType) =>
  <DataDto extends Type<unknown>>(dataDto: DataDto) =>
    applyDecorators(
      ApiExtraModels(GeneralResponse, dataDto),
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(GeneralResponse) },
            {
              properties: {
                result: {
                  type: dataType,
                  items: { $ref: getSchemaPath(dataDto) },
                },
                error: {
                  type: "boolean",
                },
                message: {
                  type: ResponseMessage["message"],
                },
              },
            },
          ],
        },
      })
    );

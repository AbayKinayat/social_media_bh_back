import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";

export interface IPaginationData<T> {
  data: T[],
  count: number,
  total: number
}

@Injectable()
export class PaginationService {

  public calcOffset(limit: number, page: number): number {
    return page * limit - limit;
  }

  public generatePaginationData<T>(data: T[], count: number, limit: number): IPaginationData<T> {
    return {
      data,
      count,
      total: Math.ceil(count / limit),
    }
  }
}
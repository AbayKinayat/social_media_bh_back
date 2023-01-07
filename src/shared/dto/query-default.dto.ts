import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

enum SORT_NAMES  {
  "DESC" = "DESC",
  "ASC" = "ASC",
}

export default class QueryDefaultDto<T = undefined> {

  @ApiProperty({ example: "5", description: "Номер текущей страницы сущности" })
  @IsNumber()
  @IsOptional()
  page?: number
  
  @ApiProperty({ example: "10", description: "Количество данных одной страницы сущности" })
  @IsNumber()
  @IsOptional()
  limit?: number

  @ApiProperty({ example: "name", description: "Название поле сущности по которому будет сортировка" })
  @IsString()
  @IsOptional()
  sortName?: string

  @ApiProperty({ example: "ASC", description: "Название порядка сортировки" })
  @IsEnum(SORT_NAMES)
  @IsOptional()
  sortOrder?: "DESC" | "ASC"

  @ApiProperty({ example: "{ name: 'Ivan' }", description: "Объект фильтр для фильтрации сущности" })
  @IsOptional()
  filter: T extends undefined ? undefined : T;

}
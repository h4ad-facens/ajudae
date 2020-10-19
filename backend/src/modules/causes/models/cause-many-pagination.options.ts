//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { PaginationOptions } from '../../../common/pagination.options';

//#endregion

/**
 * A classe que representa as opções de paginação de uma causa
 */
export class CauseManyPaginationOptions extends PaginationOptions {

  /**
   * A identificação da ong
   */
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(value => Number(value))
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'A identificação da ong precisa ser um número válido.' })
  public ongId?: number;

  /**
   * Diz se deve filtrar por causas expiradas ou não
   */
  @ApiPropertyOptional({ default: 'unexpired', type: () => String })
  @IsOptional()
  @IsString({ message: 'É necessário que o tipo de filtro seja um texto válido.' })
  public filterBy?: 'unexpired' | 'expired';

}

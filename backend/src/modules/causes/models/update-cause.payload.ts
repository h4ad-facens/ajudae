//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

//#endregion

/**
 * A classe que representa o payload enviado para atualizar uma causa
 */
export class UpdateCausePayload {

  /**
   * A lista de categorias dessa causa
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'As categorias precisam ser um texto válido.' })
  @MaxLength(256, { message: 'É necessário que as categorias não ultrapassem os 256 caracteres.' })
  public categories?: string;

  /**
   * A descrição dessa causa
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'A descrição precisa ser um texto válido.' })
  public description?: string;

  /**
   * A data de quando expira essa causa
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'A data de expiração precisa vir em um formato UNIX Time.' })
  public expiresAt?: number;

}

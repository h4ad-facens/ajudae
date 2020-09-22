//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsString, MaxLength } from 'class-validator';

//#endregion

/**
 * A classe que representa o payload enviado para criar uma nova causa
 */
export class CreateCausePayload {

  /**
   * A lista de categorias dessa causa
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar ao menos um categoria que descreva essa causa.' })
  @IsString({ message: 'As categorias precisam ser um texto válido.' })
  @MaxLength(256, { message: 'É necessário que as categorias não ultrapassem os 256 caracteres.' })
  public categories: string;

  /**
   * A descrição dessa causa
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar uma descrição para a sua causa.' })
  @IsString({ message: 'A descrição precisa ser um texto válido.' })
  public description: string;

  /**
   * A data de quando expira essa causa
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar a data de quando essa causa irá expirar.' })
  @IsInt({ message: 'A data de expiração precisa vir em um formato UNIX Time.' })
  public expiresAt: number;

  /**
   * A identificação da ONG na qual essa causa pertence
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar qual é a ONG para o qual essa causa será criada.' })
  @IsInt({ message: 'É necessário enviar a identificação da ONG em formato de um número inteiro válido.' })
  public ongId: number;


}

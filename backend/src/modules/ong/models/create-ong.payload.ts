//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsHexColor, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../common/default-validation-messages';

//#endregion

/**
 * A classe que representa as informações que serão usadas para criar uma ong
 */
export class CreateOngPayload extends BaseCrudCreatePayload {

  /**
   * O nome dessa ong
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar o nome dessa ong.' })
  @MinLength(1, { message: 'O nome da ong precisa ter ao menos um caracter.' })
  @MaxLength(255, { message: 'O nome da ong não pode ter mais que 255 caracteres.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public name: string;

  /**
   * O e-mail da ong
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar um e-mail.' })
  @MaxLength(255, { message: 'É necessário enviar um e-mail contendo menos de 255 caracteres.' })
  @IsEmail({ }, { message: DefaultValidationMessages.IsEmail })
  public email: string;

  /**
   * A cor dessa ONG
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar a cor da ONG.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsHexColor({ message: 'A cor dessa ONG precisa ser uma cor em Hexadecimal.' })
  public color: string;

  /**
   * A imagem da ONG
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar a imagem para a ONG.' })
  @IsString({ message: 'A imagem da ONG precisa ser um url.' })
  @IsUrl({ }, { message: 'A imagem da ONG precisa ser um url válido.' })
  public image: string;

  /**
   * O número de WhatsApp para entrar em contato com essa ong
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar o whatsapp de contato dessa ong.' })
  @MinLength(11, { message: 'É necessário enviar um número de telefone válido com DDD.' })
  @MaxLength(255, { message: 'O número de WhatsApp não pode ter mais que 255 caracteres.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  // TODO: Talvez adicionar uma validação melhorar para o número de WhatsApp
  public whatsapp: string;

}

//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { isValid } from '../../../utils/functions';
import { UserProxy } from '../../user/models/user.proxy';
import { OngEntity } from '../entities/ong.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre uma ong
 */
export class OngProxy extends BaseCrudProxy {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    entity: OngEntity,
  ) {
    super(entity);

    this.name = entity.name;
    this.email = entity.email;
    this.color = entity.color;
    this.image = entity.image;
    this.whatsapp = entity.whatsapp;
    this.userId = entity.userId;
    this.user = isValid(entity.user) && new UserProxy(entity.user) || void 0;
  }

  //#endregion

  /**
   * O nome dessa ong
   */
  @ApiProperty()
  public name: string;

  /**
   * O e-mail da ong
   */
  @ApiProperty()
  public email: string;

  /**
   * A cor dessa ONG
   */
  @ApiProperty()
  public color: string;

  /**
   * A imagem da ONG
   */
  @ApiProperty()
  public image: string;

  /**
   * O número de WhatsApp para entrar em contato com essa ong
   */
  @ApiProperty()
  public whatsapp: string;

  /**
   * A identificação do usuário que controla essa ong
   */
  @ApiProperty()
  public userId: number;

  /**
   * As informações sobre o usuário
   */
  @ApiPropertyOptional({ type: () => UserProxy })
  @Type(() => UserProxy)
  public user: UserProxy;

}

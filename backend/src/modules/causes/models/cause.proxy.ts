//#region Imports

import { ApiProperty } from '@nestjs/swagger';

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { isValid } from '../../../utils/functions';
import { OngProxy } from '../../ong/models/ong.proxy';
import { CauseEntity } from '../entities/cause.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre as causas de uma ong
 */
export class CauseProxy extends BaseCrudProxy {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    entity: CauseEntity,
  ) {
    super(entity);

    this.categories = entity.categories;
    this.description = entity.description;
    this.expiresAt = entity.expiresAt;
    this.ongId = entity.ongId;
    this.ong = isValid(entity.ong) && new OngProxy(entity.ong) || void 0;
  }

  //#endregion

  //#region Public Properties

  /**
   * A lista de categorias dessa causa
   */
  @ApiProperty()
  public categories: string;

  /**
   * A descrição dessa causa
   */
  @ApiProperty()
  public description: string;

  /**
   * A data de quando expira essa causa
   */
  @ApiProperty()
  public expiresAt: number;

  /**
   * A identificação da ONG na qual essa causa pertence
   */
  @ApiProperty()
  public ongId: number;

  /**
   * As informações da ONG
   */
  @ApiProperty({ type: () => OngProxy })
  public ong?: OngProxy;

  //#endregion

}

//#region Imports

import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../common/base-entity';
import { OngEntity } from '../../ong/entities/ong.entity';

//#endregion

/**
 * A class que representa a entidade que lida com as informações sobre as causas
 */
@Entity('causes')
export class CauseEntity extends BaseEntity {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    partial: Partial<CauseEntity> | CauseEntity,
  ) {
    super();

    Object.assign(this, { ...partial });
  }

  //#endregion

  //#region Public Properties

  /**
   * A lista de categorias dessa causa
   */
  @Column({ nullable: false, length: 256 })
  public categories: string;

  /**
   * A descrição dessa causa
   */
  @Column({ nullable: false, type: 'text' })
  public description: string;

  /**
   * A data de quando expira essa causa
   */
  @Column({ nullable: false, type: 'bigint' })
  public expiresAt: number;

  /**
   * A identificação da ONG na qual essa causa pertence
   */
  @Column({ nullable: false })
  public ongId: number;

  /**
   * As informações da ONG na qual essa causa pertence
   */
  @ManyToOne(() => OngEntity, ong => ong.causes)
  public ong?: OngEntity;

  //#endregion

}

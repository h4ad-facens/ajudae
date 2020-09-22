//#region Imports

import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { TypeOrmValueTypes } from '../../../common/type-orm-value.types';
import { isValid } from '../../../utils/functions';
import { OngService } from '../../ong/services/ong.service';
import { UserEntity } from '../../user/entities/user.entity';
import { CauseEntity } from '../entities/cause.entity';
import { CauseManyPaginationOptions } from '../models/cause-many-pagination.options';
import { CreateCausePayload } from '../models/create-cause.payload';
import { UpdateCausePayload } from '../models/update-cause.payload';

//#endregion

/**
 * A classe que representa o serviço que lida com as causas de uma ong
 */
@Injectable()
export class CauseService {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    @InjectRepository(CauseEntity)
    public readonly repository: Repository<CauseEntity>,
    private readonly ong: OngService,
  ) { }

  //#endregion

  //#region Crud Methods

  /**
   * Método que retorna uma lista com as entidades
   *
   * @param options As opções ao buscar várias causas
   */
  public async listMany(options: CauseManyPaginationOptions): Promise<CauseEntity[]> {
    const { search, limit = 15, page = 1, relations = [], ongId } = options;

    const normalizedLimit = Math.min(100, Math.max(1, limit));
    const normalizedPage = Math.max(1, page);

    let query = this.repository.createQueryBuilder('cause')
      .where('cause.isActive = :isActive', { isActive: TypeOrmValueTypes.TRUE })
      .take(normalizedLimit)
      .skip((normalizedPage - 1) * limit);

    if (relations.some(relation => relation === 'ong'))
      query = query.leftJoinAndSelect('cause.ong', 'ong');

    if (Number(ongId))
      query = query.andWhere('cause.ongId = :ongId', { ongId: Number(ongId) || 0 });

    if (search)
      query = query.andWhere('LOWER(cause.categories) LIKE :search OR LOWER(cause.description) LIKE :search', { search: `%${ search.toLowerCase() }%` });

    return query.getMany();
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param entityId A identificação da entidade que está sendo procurada
   */
  public async getOne(entityId: number): Promise<CauseEntity> {
    const entity = this.repository.findOne({
      where: {
        id: Number(entityId) || 0,
        isActive: TypeOrmValueTypes.TRUE,
      },
    });

    if (!entity)
      throw new NotFoundException(`A entidade procurada pela identificação (${ entityId }) não foi encontrada.`);

    return entity;
  }

  /**
   * Método que cria uma entidade
   *
   * @param requestUser As informações do usuário da requisição
   * @param payload As informações para a criação
   */
  public async create(requestUser: UserEntity, payload: CreateCausePayload): Promise<CauseEntity> {
    const cause = this.getEntityFromPayload(payload);
    const ong = await this.ong.getOne(cause.ongId);

    if (ong.userId !== requestUser.id)
      throw new ForbiddenException('Você não tem permissão de criar uma causa para uma organização na qual você não controla.');

    return await this.repository.save(cause);
  }

  /**
   * Método que atualiza as informações de uma entidade
   *
   * @param requestUser As informações do usuário da requisição
   * @param entityId A identificação da entidade que está sendo procurada
   * @param payload As informações para a atualização da entidade
   */
  public async update(requestUser: UserEntity, entityId: number, payload: UpdateCausePayload): Promise<CauseEntity> {
    const cause = await this.getOne(entityId);
    const causeToUpdate = new CauseEntity({
      ...cause,
      ...this.getEntityFromPayload(payload, entityId),
    });

    const ong = await this.ong.getOne(causeToUpdate.ongId);

    if (ong.userId !== requestUser.id)
      throw new ForbiddenException('Você não tem permissão de atualizar uma causa de uma organização na qual você não controla.');

    return await this.repository.save(causeToUpdate);
  }

  /**
   * Método que deleta uma entidade
   *
   * @param requestUser As informações do usuário da requisição
   * @param entityId A identificação da entidade que está sendo procurada
   */
  public async delete(requestUser: UserEntity, entityId: number): Promise<void> {
    const cause = await this.getOne(entityId);

    cause.isActive = false;

    const ong = await this.ong.getOne(cause.ongId);

    if (ong.userId !== requestUser.id)
      throw new ForbiddenException('Você não tem permissão de remover uma causa de uma organização na qual você não controla.');

    return void await this.repository.save(cause);
  }

  //#endregion

  //#region Private Methods

  /**
   * Método que retorna as informações de uma entidade a partir das informações do payload
   *
   * @param payload As informações do payload
   * @param entityId A identificação da entidade
   */
  private getEntityFromPayload(payload: CreateCausePayload | UpdateCausePayload, entityId?: number): CauseEntity {
    return new CauseEntity({
      ...isValid(entityId) && { id: entityId },
      ...isValid(payload.categories) && { categories: payload.categories },
      ...isValid(payload.description) && { description: payload.description },
      ...isValid(payload.expiresAt) && { expiresAt: payload.expiresAt },
      ...payload instanceof CreateCausePayload && isValid(payload.ongId) && { ongId: payload.ongId },
    });
  }

  //#endregion

}

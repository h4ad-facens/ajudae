//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { User } from '../../../decorators/user/user.decorator';
import { CrudProxy, mapCrud } from '../../../utils/crud';
import { UserEntity } from '../../user/entities/user.entity';
import { CauseManyPaginationOptions } from '../models/cause-many-pagination.options';
import { CauseProxy } from '../models/cause.proxy';
import { CreateCausePayload } from '../models/create-cause.payload';
import { UpdateCausePayload } from '../models/update-cause.payload';
import { CauseService } from '../services/cause.service';

//#endregion

/**
 * A classe que representa o controller que lida com as causas
 */
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('causes')
@Controller('causes')
export class CauseController {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly service: CauseService,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna várias informações da entidade
   *
   * @param options As opções para a listagem das causas
   */
  @Get()
  @ApiOperation({ summary: 'Lista as causas' })
  @ApiOkResponse({ type: CauseProxy, isArray: true })
  public getMany(@Query(new ValidationPipe({ whitelist: true, transform: true })) options?: CauseManyPaginationOptions): Promise<CrudProxy<CauseProxy>> {
    return this.service.listMany(options).then(response => mapCrud(CauseProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param entityId A identificação da entidade
   */
  @Get('/:id')
  @ApiOperation({ summary: 'Busca uma causa especifica' })
  @ApiOkResponse({ type: CauseProxy })
  public getOne(@Param('id') entityId: number): Promise<CrudProxy<CauseProxy>> {
    return this.service.getOne(entityId).then(response => mapCrud(CauseProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param requestUser As informações do usuário da requisição
   * @param payload As informações para a criação da entidade
   */
  @Post()
  @ProtectTo('user')
  @ApiOperation({ summary: 'Cria uma causa' })
  @ApiOkResponse({ type: CauseProxy })
  public createOne(@User() requestUser: UserEntity, @Body() payload: CreateCausePayload): Promise<CrudProxy<CauseProxy>> {
    return this.service.create(requestUser, payload).then(response => mapCrud(CauseProxy, response));
  }

  /**
   * Método que atualiza uma entidade
   *
   * @param requestUser As informações do usuário da requisição
   * @param entityId A identificação da entidade
   * @param payload As informações para a atualização da entidade
   */
  @Put('/:id')
  @ProtectTo('user')
  @ApiOperation({ summary: 'Atualiza uma causa' })
  @ApiOkResponse({ type: CauseProxy })
  public async replaceOne(@User() requestUser: UserEntity, @Param('id') entityId: number, @Body() payload: UpdateCausePayload): Promise<CrudProxy<CauseProxy>> {
    return await this.service.update(requestUser, entityId, payload).then(response => mapCrud(CauseProxy, response));
  }

  /**
   * Método que deleta uma entidade
   *
   * @param requestUser As informações do usuário da requisição
   * @param entityId A identificação da entidade
   */
  @Delete('/:id')
  @ProtectTo('user')
  @ApiOperation({ summary: 'Remove uma causa' })
  @ApiOkResponse({ type: void 0 })
  public async deleteOne(@User() requestUser: UserEntity, @Param('id') entityId: number): Promise<void> {
    return await this.service.delete(requestUser, entityId);
  }

  //#endregion

}

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Role } from 'src/enums/role.enums';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { User } from 'src/decorators/user.decorator'; // 👈 para pegar o usuário logado

// 🔒 ADMIN tem acesso global às rotas (com o merge, ele também acessa as específicas)
@Roles(Role.Admin)
@UseGuards(ThrottlerGuard, AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor) // controla logs de todas as rotas
@Controller('users')
export class UserController {
  constructor(private readonly userSevice: UserService) {}

  // ✅ Criação de usuários — restrito a ADMIN
  @UseGuards(ThrottlerGuard)
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userSevice.create(data);
  }

  // ✅ Listagem — restrito a ADMIN
  @Get()
  async list() {
    return this.userSevice.list();
  }

  // ✅ Consulta de perfil — USER pode ver o próprio; ADMIN vê qualquer um
  @Roles(Role.User)
  @Get(':id')
  async show(@ParamId() id: number, @User() user) {
    // 🔒 Se for um user comum, só pode acessar o próprio ID
    if (user.role === Role.User && user.id !== id) {
      throw new ForbiddenException('Você só pode visualizar o seu próprio perfil!');
    }
    console.log({ id });
    return this.userSevice.show(id);
  }

  // ✅ Atualização completa — apenas ADMIN
  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
    return this.userSevice.update(id, data);
  }

  // ✅ Atualização parcial — USER pode atualizar o próprio perfil
  @Roles(Role.User)
  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchUserDTO,
    @ParamId() id: number,
    @User() user,
  ) {
    // 🔒 Se for user comum, só pode alterar o próprio ID
    if (user.role === Role.User && user.id !== id) {
      throw new ForbiddenException('Você só pode atualizar o seu próprio perfil!');
    }
    return this.userSevice.updatePartial(id, data);
  }

  // ✅ Exclusão — apenas ADMIN
  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.userSevice.delete(id);
  }
}

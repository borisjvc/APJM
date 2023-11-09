import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './users.controller';
import { UsuariosService } from './users.service';
import { Usuario } from './dto/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    controllers: [UsuariosController],
    providers: [UsuariosService],
    exports: [UsuariosService], // Opcional si deseas exportar el servicio
})
export class UsuariosModule { }

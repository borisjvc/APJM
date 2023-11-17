import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './users.controller';
import { UsuariosService } from './users.service';
import { Usuario } from './dto/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
        secret: 'x@das87199sd@fAfasd$jifJ&DSO00ZX0C021H', 
        signOptions: { expiresIn: '3h' }, // Set the expiration time for the token
    })],
    controllers: [UsuariosController],
    providers: [UsuariosService],
    exports: [UsuariosService], // Opcional si deseas exportar el servicio
})
export class UsuariosModule { }

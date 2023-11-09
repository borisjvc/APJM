import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuariosService } from './users.service';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Post()
    async crearUsuario(
        @Body('Username') username: string,
        @Body('Passwrd') passwrd: string,
        @Body('Email') email: string,
        @Body('Rol') rol: string,
    ) {
        const newUser = await this.usuariosService.crearUsuario(username, passwrd, email, rol);
        return newUser;
    }

    @Get(':id')
    async obtenerUsuarioPorID(@Param('id') userID: number) {
        const user = await this.usuariosService.obtenerUsuarioPorID(userID);
        return user;
    }

    @Get()
    async obtenerUsuarios() {
        const users = await this.usuariosService.obtenerUsuarios();
        return users;
    }

    @Put(':id')
    async actualizarUsuario(
        @Param('id') userID: number,
        @Body('Username') username: string,
        @Body('Passwrd') passwrd: string,
        @Body('Email') email: string,
        @Body('Rol') rol: string,
    ) {
        const updatedUser = await this.usuariosService.actualizarUsuario(userID, username, passwrd, email, rol);
        return updatedUser;
    }

    @Delete(':id')
    async eliminarUsuario(@Param('id') userID: number) {
        await this.usuariosService.eliminarUsuario(userID);
        return { message: 'Usuario eliminado exitosamente' };
    }
}

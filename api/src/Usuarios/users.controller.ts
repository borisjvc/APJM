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
        @Body('Rol') rol?: string,
    ) {
        try {
            const newUser = await this.usuariosService.crearUsuario(username, passwrd, email, rol);
            return newUser;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    @Get(':id')
    async obtenerUsuarioPorID(@Param('id') userID: number) {
        try {
            const user = await this.usuariosService.obtenerUsuarioPorID(userID);
            return user;
        } catch (error) {
            return { message: error };
        }

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

    @Post('login')
    async login(@Body('Email') Email: string, @Body('Passwrd') Passwrd: string) {
        const user = await this.usuariosService.validateUser(Email, Passwrd);

        if (!user) {
            return { message: 'Credenciales invalidas' };
        }

        return { token: user.token, message: 'Login exitoso' };
    }

    @Post('Google')
    async Google(
        @Body('Username') username: string,
        @Body('Email') Email: string,
        @Body('Passwrd') Passwrd: string
    ) {
        try {
            const user = await this.usuariosService.validateUser(Email, Passwrd);
            return { token: user.token, message: 'Login exitoso' };
        } catch (error) {
            const newUser = await this.usuariosService.crearUsuario(username, Passwrd, Email);
            return { user: newUser, message: 'Registro exitoso' };
        }

    }
}

import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UsuariosListasService } from './listas.service';

@Controller('listas')
export class UsuariosListasController {
    constructor(private readonly usuariosListasService: UsuariosListasService) { }

    @Get(':usuarioID')
    async leerListaDeUsuario(@Param('usuarioID') usuarioID: number) {
        return this.usuariosListasService.leerListaDeUsuario(usuarioID);
    }

    @Delete(':usuarioID/:elementoID')
    async eliminarDeLista(@Param('usuarioID') usuarioID: number, @Param('elementoID') elementoID: number) {
        return this.usuariosListasService.eliminarDeLista(usuarioID, elementoID);
    }

    @Post('agregar')
    async agregarALista(
        @Body('user') user: number,
        @Body('elemento') elemento: string,
        @Body('status') status: string) {
        return this.usuariosListasService.agregarALista(user, elemento, status);
    }

    @Put('status')
    async actualizarEstatusEnLista(@Body() body: { usuarioID: number; elementoID: number; estatus: string }) {
        const { usuarioID, elementoID, estatus } = body;
        return this.usuariosListasService.actualizarEstatusEnLista(usuarioID, elementoID, estatus);
    }

    @Get('listas')
    async obtenerListas() {
        return this.usuariosListasService.obtenerListas();
    }
}
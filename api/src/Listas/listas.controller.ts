import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { UsuariosListasService } from './listas.service';

@Controller('listas')
export class UsuariosListasController {
    constructor(private readonly usuariosListasService: UsuariosListasService) { }

    @Get(':usuarioID')
    async leerListaDeUsuario(@Param('usuarioID') usuarioID: number) {
        return this.usuariosListasService.leerListaDeUsuario(usuarioID);
    }

    @Delete(':usuarioID/:elementoID')
    async eliminarDeLista(@Param('usuarioID') usuarioID: number, @Param('elementoID') elementoID: string) {
        return this.usuariosListasService.eliminarDeLista(usuarioID, elementoID);
    }

    @Post('agregar')
    async agregarALista(
        @Body('user') user: number,
        @Body('elemento') elemento: string,
        @Body('status') status: string,
        @Body('tipo') tipo: string
    ) {
        return this.usuariosListasService.agregarALista(user, elemento, status, tipo);
    }

    @Put('status')
    async actualizarEstatusEnLista(
        @Body('user') user: number,
        @Body('elemento') elemento: string,
        @Body('status') status: string,
        @Body('tipo') tipo: string
    ) {
        return this.usuariosListasService.actualizarEstatusEnLista(user, elemento, status, tipo);
    }

    @Get('listas')
    async obtenerListas() {
        return this.usuariosListasService.obtenerListas();
    }

    @Get('status')
    async VerificarElementoEnLista(
        @Query('user') user: number,
        @Query('elemento') elemento: string,
        @Query('tipo') tipo: string
    ) {
        console.log(user, elemento, tipo);
        const result = await this.usuariosListasService.VerificarElementoEnLista(user, elemento, tipo);
        console.log(result);
        return result;
    }
}
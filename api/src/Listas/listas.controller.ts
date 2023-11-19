import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UsuariosListasService } from './listas.service';

@Controller('listas')
export class UsuariosListasController {
    constructor(private readonly usuariosListasService: UsuariosListasService) { }

    @Get(':usuarioID')
    async leerListaDeUsuario(@Param('usuarioID') usuarioID: number) {
        return await this.usuariosListasService.leerListaDeUsuario(usuarioID);
    }

    @Delete('eliminar/:usuarioID/:elementoID/:tipo')
    async eliminarDeLista(@Param('usuarioID') usuarioID: number, @Param('elementoID') elementoID: string, @Param('tipo') tipo: string) {
        return await this.usuariosListasService.eliminarDeLista(usuarioID, elementoID, tipo);
    }

    @Post('agregar')
    async agregarALista(
        @Body('user') user: number,
        @Body('elemento') elemento: string,
        @Body('status') status: string,
        @Body('tipo') tipo: string,
        @Body('titulo') titulo: string,
        @Body('img') img: string
    ) {
        return await this.usuariosListasService.agregarALista(user, elemento, status, tipo, titulo, img);
    }

    @Put('status')
    async actualizarEstatusEnLista(
        @Body('user') user: number,
        @Body('elemento') elemento: string,
        @Body('status') status: string,
        @Body('tipo') tipo: string
    ) {
        return await this.usuariosListasService.actualizarEstatusEnLista(user, elemento, status, tipo);
    }

    @Get()
    async obtenerListas() {
        const listas = await this.usuariosListasService.obtenerListas();
        return listas[0];
    }

    @Post('added')
    async VerificarElementoEnLista(
        @Body('user') user: number,
        @Body('elemento') elemento: string,
        @Body('tipo') tipo: string
    ) {
        const result = await this.usuariosListasService.VerificarElementoEnLista(user, elemento, tipo);
        return result[0][0];
    }
}
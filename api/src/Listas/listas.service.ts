import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsuariosListasService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) { }

    async leerListaDeUsuario(usuarioID: number) {
        const lista = await this.entityManager.query('CALL LeerListaDeUsuario(?)', [usuarioID]);
        return lista[0];
    }

    async eliminarDeLista(usuarioID: number, elementoID: string) {
        return this.entityManager.query('CALL EliminarDeLista(?, ?)', [usuarioID, elementoID]);
    }

    async agregarALista(usuarioID: number, elementoID: string, estatus: string, tipo: string) {
        const result = await this.entityManager.query('CALL AgregarALista(?, ?, ?, ?)', [usuarioID, elementoID, estatus, tipo]);
        return result;
    }

    async actualizarEstatusEnLista(usuarioID: number, elementoID: string, estatus: string, tipo: string) {
        const status = await this.entityManager.query('CALL ActualizarEstatusEnLista(?, ?, ?, ?)', [usuarioID, elementoID, estatus, tipo]);
        console.log(status);
        return status;
    }

    async obtenerListas() {
        return this.entityManager.query('CALL ObtenerListas()');
    }

    async VerificarElementoEnLista(usuario: number, elemento: string, tipo: string){
        const status = await this.entityManager.query('CALL VerificarElementoEnLista(?, ?, ?)', [usuario, elemento, tipo])
        return status;
    }
}

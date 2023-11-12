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
        return this.entityManager.query('CALL LeerListaDeUsuario(?)', [usuarioID]);
    }

    async eliminarDeLista(usuarioID: number, elementoID: number) {
        return this.entityManager.query('CALL EliminarDeLista(?, ?)', [usuarioID, elementoID]);
    }

    async agregarALista(usuarioID: number, elementoID: number, estatus: string) {
        return this.entityManager.query('CALL AgregarALista(?, ?, ?)', [usuarioID, elementoID, estatus]);
    }

    async actualizarEstatusEnLista(usuarioID: number, elementoID: number, estatus: string) {
        return this.entityManager.query('CALL ActualizarEstatusEnLista(?, ?, ?)', [usuarioID, elementoID, estatus]);
    }

    async obtenerListas() {
        return this.entityManager.query('CALL ObtenerListas()');
    }
}

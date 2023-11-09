import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './dto/user.entity';
import { Connection } from 'typeorm';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        private readonly connection: Connection, // conexión a la base de datos
    ) { }

    async crearUsuario(username: string, passwrd: string, email: string, rol: string): Promise<Usuario> {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Llamar al procedimiento almacenado para crear un usuario
            await queryRunner.query('CALL CrearUsuario(?, ?, ?, ?)', [username, passwrd, email, rol]);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }

        // Devolver el usuario creado 
        const newUser = new Usuario();
        newUser.Username = username;
        newUser.Passwrd = passwrd;
        newUser.Email = email;
        newUser.Rol = rol;
        return newUser;
    }

    async obtenerUsuarioPorID(userID: number): Promise<Usuario> {
        // Llamar al procedimiento almacenado para obtener un usuario por su ID
        const result = await this.usuarioRepository.query('CALL ObtenerUsuarioPorID(?)', [userID]);
        return result[0]; // Asumiendo que el procedimiento devuelve un solo usuario
    }

    async obtenerUsuarios(): Promise<Usuario[]> {
        // Llamar al procedimiento almacenado para obtener todos los usuarios
        const result = await this.usuarioRepository.query('CALL ObtenerUsuarios');
        return result[0][0];
    }

    async actualizarUsuario(userID: number, username: string, passwrd: string, email: string, rol: string): Promise<Usuario> {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Llamar al procedimiento almacenado para actualizar un usuario
            await queryRunner.query('CALL ActualizarUsuario(?, ?, ?, ?, ?)', [userID, username, passwrd, email, rol]);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }

        // Devolver el usuario actualizado (puedes ajustar esto según tu necesidad)
        const updatedUser = new Usuario();
        updatedUser.Username = username;
        updatedUser.Passwrd = passwrd;
        updatedUser.Email = email;
        updatedUser.Rol = rol;
        return updatedUser;
    }

    async eliminarUsuario(userID: number): Promise<void> {
        // Llamar al procedimiento almacenado para eliminar un usuario
        await this.usuarioRepository.query('CALL EliminarUsuario(?)', [userID]);
    }
}

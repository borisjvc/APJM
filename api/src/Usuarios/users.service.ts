import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './dto/user.entity';
import { Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        private readonly connection: Connection, // conexión a la base de datos
        private readonly jwtService: JwtService,
    ) { }

    async crearUsuario(username: string, passwrd: string, email: string, rol?: string): Promise<Usuario> {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Verificar si ya existe un usuario con el mismo correo electrónico
            const existingUser = await queryRunner.query('SELECT * FROM Usuarios WHERE Email = ?', [email]);

            if (existingUser.length > 0) {
                throw new Error('Ya existe un usuario con este correo electrónico.');
            }
            else {
                // Si no existe, proceder con la creación del usuario
                await queryRunner.query('CALL CrearUsuario(?, ?, ?, ?)', [username, passwrd, email, rol]);
                await queryRunner.commitTransaction();
                // Devolver el usuario creado
                const newUser = new Usuario();
                newUser.Username = username;
                newUser.Passwrd = passwrd;
                newUser.Email = email;
                newUser.Rol = rol;
                return newUser;
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }

    }

    async obtenerUsuarioPorID(userID: number): Promise<Usuario> {
        const result = await this.usuarioRepository.query('CALL LeerUsuario(?)', [userID]);
        return result[0];
    }

    async obtenerUsuarios(): Promise<Usuario[]> {
        const result = await this.usuarioRepository.query('CALL ObtenerUsuarios');
        return result[0];
    }

    async actualizarUsuario(userID: number, username: string, passwrd: string, email: string, rol: string): Promise<{ success: boolean, message?: string }> {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result = await queryRunner.query('CALL ActualizarUsuario(?, ?, ?, ?, ?)', [userID, username, passwrd, email, rol]);

            // Verificar el resultado de la actualización
            if (result && result.affectedRows > 0) {
                await queryRunner.commitTransaction();
                return { success: true, message: 'Actualización exitosa' };
            } else {
                throw new Error('No se pudo actualizar el usuario.');
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return { success: false, message: error.message || 'Error al actualizar el usuario.' };
        } finally {
            await queryRunner.release();
        }
    }

    async eliminarUsuario(userID: number): Promise<void> {
        await this.usuarioRepository.query('CALL EliminarUsuario(?)', [userID]);
    }

    async validateUser(Email: string, password: string): Promise<{ user: Usuario, token: string } | null> {
        const result = await this.usuarioRepository.query('CALL usp_ValidateUser(?, ?)', [Email, password]);
        const user = result[0];

        if (user.length === 0) {
            return null;
        }

        const payload = { id: user[0].ID, username: user[0].Username, email: user[0].Email, rol: user[0].Rol };

        const token = this.jwtService.sign(payload);

        return { user, token };
    }

}

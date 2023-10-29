import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository:
        Repository<User>) { }

    createUser(user: CreateUserDto) {
        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }

    getUsers() {
        return this.userRepository.find()
    }

    getUser(id: number) {
        return this.userRepository.findOne({
            where: {
                id
            }
        });
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id });
    }

    updateUser(id: number, user: UpdateUserDto) {
        return this.userRepository.update({ id }, user)
    }

    async loginUser(usuario: LoginUserDto) {
        const { Username, Password } = usuario;

        const user = await this.userRepository.findOne({
            where: { Username }
        });
        
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (Password == user.Password) {
            return {
                success: true,
                message: 'Inicio de sesión exitoso',
                user: usuario
            }
        } else {
            throw new Error('Constraseña incorrecta');
        }

    }

}

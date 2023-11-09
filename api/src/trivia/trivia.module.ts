import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TriviaController } from './trivia.controller';
import { TriviaService } from './trivia.service';
/*
@Module({
    imports: [TypeOrmModule.forFeature([Trivia])],
    controllers: [TriviaController],
    providers: [TriviaService],
    exports: [TriviaService],
})
export class UsuariosModule { }*/

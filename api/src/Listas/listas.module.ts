import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosListasService } from './listas.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [UsuariosListasService],
  exports: [UsuariosListasService],
})
export class ListasModule {}

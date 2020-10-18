import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { query } from "express";

export class createOrphanages1602595353030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
      //realizar as alterações (cria tabela, novo campo, deletar algo, etc)
      await queryRunner.createTable(new Table({
        name: 'orphanages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true, //chave primaria
            isGenerated: true,
            generationStrategy: 'increment', //a cada orfanato o id aumenta automaticamente
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'latitude',
            type: 'decimal',
            scale: 10, //numeros antes da virgula
            precision: 2, //numeros depois da virgula
          },
          {
            name: 'longitude',
            type: 'decimal',
            scale: 10,
            precision: 2,
          },
          {
            name: 'about',
            type: 'text',
          },
          {
            name: 'wppNumber',
            type: 'varchar',
         },
          {
            name: 'instructions',
            type: 'text',
          },
          {
            name: 'opening_hours',
            type: 'varchar'
          },
          {
            name: 'open_on_weekends',
            type: 'boolean',
            default: false,
          },
        ]
      }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      //desfazer o que foi feito no up (criou uma tabela no up, o down 'deletou')
      await queryRunner.dropTable('orphanages');
  }

}

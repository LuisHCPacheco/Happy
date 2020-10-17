import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createImages1602604935453 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns:[
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true, //chave primaria
          isGenerated: true,
          generationStrategy: 'increment', //a cada orfanato o id aumenta automaticamente
        },
        {
          name: 'path',
          type: 'varchar',
        },
        {
          name: 'orphanage_id',
          type: 'integer',
        },
      ],
      foreignKeys:[
        {
          name: 'ImageOrphanage',
          columnNames: ['orphanage_id'],
          referencedTableName: 'orphanages',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}

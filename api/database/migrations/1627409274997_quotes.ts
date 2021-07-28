import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Quotes extends BaseSchema {
  protected tableName = 'quotes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('text')
      table.string('author')
      table.integer('likes').nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

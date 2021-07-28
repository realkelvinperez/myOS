import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class QuotesController {
  public async index({}: HttpContextContract) {
    const quote = await Database.rawQuery(
      // Select all quotes from quoutes by Random OFFSET to the nth of all of quotes limit to 1
      `SELECT * FROM quotes OFFSET random() * (SELECT count(*) FROM quotes) LIMIT 1`
    )
    if (quote.rowCount) return quote.rows[0]
    else return { status: 'No quotes found' }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

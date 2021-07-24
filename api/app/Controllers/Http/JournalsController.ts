import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Journal from 'App/Models/Journal'

export default class JournalsController {
  public async index({}: HttpContextContract) {
    return await Journal.all()
  }

  // Create
  public async store({ request }: HttpContextContract) {
    const newJournal = request.body()
    const journal = await Journal.create(newJournal)
    if (journal.$isPersisted) return journal
  }

  //Read
  public async show({ params: { id } }: HttpContextContract) {
    return await Journal.findOrFail(id)
  }

  //Update
  public async update({ params: { id }, request }: HttpContextContract) {
    const body = request.body()
    const journal = await Journal.findOrFail(id)
    const updatedJournal = await journal.merge({ ...body }).save()
    return updatedJournal
  }

  //Delete
  public async destroy({ params: { id } }: HttpContextContract) {
    const journal = await Journal.findOrFail(id)
    const deletedJournal = await journal.delete()
    return {
      message: `Successfully Deleted Journal with id: ${id}`,
      deleted: deletedJournal,
    }
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
  //show All
  public async index({}: HttpContextContract) {
    return await Todo.all()
  }
  // Create
  public async store({ request }: HttpContextContract) {
    const newTodo = request.body()
    const todo = await Todo.create(newTodo)
    if (todo.$isPersisted) return todo
  }
  //Read
  public async show({ params: { id } }: HttpContextContract) {
    return await Todo.findOrFail(id)
  }
  //Update
  public async update({ params: { id }, request }: HttpContextContract) {
    const body = request.body()
    const todo = await Todo.findOrFail(id)
    const updatedTodo = await todo.merge({ ...body }).save()
    return updatedTodo
  }
  //Delete
  public async destroy({ params: { id } }: HttpContextContract) {
    const todo = await Todo.findOrFail(id)
    const deletedTodo = await todo.delete()
    return {
      message: `Successfully Deleted Todo with id: ${id}`,
      deleted: deletedTodo,
    }
  }
}

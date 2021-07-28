import Factory from '@ioc:Adonis/Lucid/Factory'
import Todo from 'App/Models/Todo'
import Journal from 'App/Models/Journal'
import Quote from 'App/Models/Quote'

export const TodoFactory = Factory.define(Todo, ({ faker }) => {
  return {
    title: faker.lorem.words(6),
    description: faker.lorem.words(20),
    completed: faker.datatype.boolean(),
  }
}).build()

export const JournalFactory = Factory.define(Journal, ({ faker }) => {
  return {
    title: faker.lorem.words(9),
    entry: faker.lorem.words(500),
  }
}).build()

export const QuoteFactory = Factory.define(Quote, ({ faker }) => {
  return {
    text: faker.lorem.words(12),
    author: faker.lorem.words(2),
  }
}).build()

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import axios from 'axios'
import Quote from 'App/Models/Quote'

export default class QuoteSeeder extends BaseSeeder {
  public async run() {
    // get quotes
    const { data } = await axios('https://type.fit/api/quotes')
    // store quotes
    const quotes = await Quote.createMany(data)
    console.log({ quotes })
  }
}

'use strict'

require('dotenv').config()

const influx = require('influx')
const influxSchema = require('./schema.js')

const database = new influx.InfluxDB({
  host: process.env.INFLUXDB_HOST,
  database: process.env.INFLUXDB_NAME,
  port: process.env.INFLUXDB_PORT,
  username: process.env.INFLUXDB_USERNAME,
  password: process.env.INFLUXDB_PASSWORD,
  schema: Object.keys(influxSchema.schema).map((measurement) => {
    return {
      measurement,
      fields: influxSchema.schema[measurement],
      tags: influxSchema.tags
    }
  })
})

module.exports = database

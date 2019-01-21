'use strict'

const influx = require('influx')
const influxSchema = require('./schema.js')
require('dotenv').config()

const dbHost = process.env.INFLUXDB_HOST
const dbPort = process.env.INFLUXDB_PORT
const dbName = process.env.INFLUXDB_NAME
const dbUsername = process.env.INFLUXDB_USERNAME
const dbPassword = process.env.INFLUXDB_PASSWORD

const database = new influx.InfluxDB({
  host: dbHost,
  database: dbName,
  username: dbUsername,
  dbPassword: dbPassword,
  schema: Object.keys(influxSchema.schema).map((measurement) => {
    return {
      measurement,
      fields:influxSchema.schema[measurement],
      tags: influxSchema.tags
    }
  })
})

module.exports = database
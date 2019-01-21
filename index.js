'use strict'

const app = require('express')()
const bodyParser = require('body-parser')
const binaryParser = require("binary-parser").Parser

const database = require('./database/connection.js')
const influxSchema = require('./database/schema.js')

require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.ROCKBLOCK_HANDLE_PORT

const payloadParser = new Parser()
  .endianess("big")
  .int16('temperature')
  .int16("yaw_angle")
  .int16("pitch_angle")
  .int16("roll_angle")
  .uint8("water_relay")
  .uint8("air_relay")
  .int16("turbine_voltage")
  .int16("front_airspeed_voltage")
  .int16("back_airspeed_voltage")
  .int16("gps_latitude")
  .int16("gps_longitude")
  .int16("gps_speed")
  .int16("gps_altitude")
  .int16("gps_satelite")
  .int16("lidar_altitude")
  .int16("front_airspeed")
  .int16("back_airspeed")
  .int16("rpm")
  .uint8("rockblock_satelite")

app.post('/rockblock-data-handler', async (req, res) => {

  if (req.get('Content-Type') !== 'application/x-www-form-urlencoded; charset=UTF-8') {
    return res.status(200).end()
  }

  const data = payloadParser.parse(req.body.data)
  data.imei = req.body.data.imei
  data.longitude = req.body.data.iridium_longitude
  data.latitude = req.body.data.iridium_latitude

  const tags = {}
  influxSchema.tags.forEach((tag) => {
    tags[tag] = data[tag]
  })

  const iPoints = Object.keys(influxSchema.schema).map((measurement) => {
    const fields = {}
    Object.keys(influxSchema.schema[measurement]).forEach((field) => {
      fields[field] = data[field]
    })
    return { measurement, fields, tags }
  })

  try {
    await database.writePoints(iPoints)    
  } catch (err) {
    return res.status(500).end()
  }

  res.status(200).end()
})

app.listen(port, () => {
  console.log(`Server run on port ${port}!`)
})
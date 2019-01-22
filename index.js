'use strict'

require('dotenv').config()

const app = require('express')()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const database = require('./database/connection.js')
const influxSchema = require('./database/schema.js')
const payloadParser = require('./parser/binary.js')
const divisionData = require('./parser/division.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('combined'))

app.post('/rockblock-data-handler', async (req, res) => {
  if (req.body.data === '') {
    return res.status(200).end()
  }

  const payload = Buffer.from(req.body.data, 'hex')
  const data = payloadParser.parse(payload)

  data.imei = req.body.imei
  data.longitude = req.body.iridium_longitude
  data.latitude = req.body.iridium_latitude
  data.binary_string = req.body.data

  // division 100
  for (const key in divisionData) {
    data[key] = data[key] / divisionData[key]
  }

  // combine tag key with tag value
  const tags = {}
  for (const key of influxSchema.tags) {
    tags[key] = data[key]
  }

  // compine field key with field value
  const iPoints = []
  for (const measurement in influxSchema.schema) {
    const fields = {}
    const timestamp = new Date('20' + req.body.transmit_time)
    for (const key in influxSchema.schema[measurement]) {
      fields[key] = data[key]
    }
    iPoints.push({ measurement, fields, tags, timestamp })
  }

  try {
    await database.writePoints(iPoints)
  } catch (err) {
    return res.status(500).end()
  }

  return res.status(200).end()
})

app.listen(process.env.ROCKBLOCK_HANDLE_PORT)

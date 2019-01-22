'use strict'

const Parser = require('binary-parser').Parser

const payloadParser = new Parser()
  .endianess('big')
  .int16('temperature')
  .int16('yaw_angle')
  .int16('pitch_angle')
  .int16('roll_angle')
  .uint8('water_relay')
  .uint8('air_relay')
  .int16('turbine_voltage')
  .int16('front_airspeed_voltage')
  .int16('back_airspeed_voltage')
  .int16('gps_latitude')
  .int16('gps_longitude')
  .int16('gps_speed')
  .int16('gps_altitude')
  .int16('gps_satelite')
  .int16('lidar_altitude')
  .int16('front_airspeed')
  .int16('back_airspeed')
  .int16('rpm')
  .uint8('rockblock_satelite')

module.exports = payloadParser

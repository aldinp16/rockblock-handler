'use strict'

const influx = require('influx')

module.exports = {
  schema: {
    'orientation': {
      'yaw_angle': influx.FieldType.FLOAT,
      'pitch_angle': influx.FieldType.FLOAT,
      'roll_angle': influx.FieldType.FLOAT
    },
    'airspeed': {
      'front_airspeed': influx.FieldType.FLOAT,
      'front_airspeed_voltage': influx.FieldType.INTEGER,
      'back_airspeed': influx.FieldType.FLOAT,
      'back_airspeed_voltage': influx.FieldType.INTEGER
    },
    'gps': {
      'gps_longitude': influx.FieldType.FLOAT,
      'gps_latitude': influx.FieldType.FLOAT,
      'gps_altitude': influx.FieldType.FLOAT,
      'gps_speed': influx.FieldType.FLOAT,
      'gps_altitude_high': influx.FieldType.FLOAT,
      'gps_satelite': influx.FieldType.INTEGER
    },
    'generator': {
      'turbine_voltage': influx.FieldType.INTEGER,
      'rpm': influx.FieldType.FLOAT
    },
    'telemetry': {
      'rockblock_satelite': influx.FieldType.INTEGER,
      'longitude': influx.FieldType.FLOAT,
      'latitude': influx.FieldType.FLOAT
    },
    'laser_altimeter': {
      'lidar_altitude': influx.FieldType.FLOAT
    },
    'environment': {
      'temperature': influx.FieldType.FLOAT
    },
    'raw': {
      'binary_string': influx.FieldType.STRING
    }
  },
  tags: [
    'imei',
    'water_relay',
    'air_relay'
  ]
}

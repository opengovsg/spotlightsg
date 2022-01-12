import convict, { Schema } from 'convict'

export interface ConfigSchema {
  port: number
  environment: 'development' | 'staging' | 'production' | 'test'
  awsRegion: string
  session: { name: string; secret: string; cookie: { maxAge: number } }
  otp: {
    expiry: number
    secret: string
    numValidPastWindows: number
    numValidFutureWindows: number
  }
  db: {
    host: string
    username: string
    password: string
    port: number
    database: string
  }
  health: { heapSizeThreshold: number; rssThreshold: number }
}

/**
 * To require an env var without setting a default,
 * use
 *    default: '',
 *    format: 'required-string',
 */
convict.addFormats({
  'required-string': {
    validate: (val: any): void => {
      if (val === '') {
        throw new Error('Required value cannot be empty')
      }
    },
    coerce: (val: any): any => {
      if (val === null) {
        return undefined
      }
      return val
    },
  },
})

export const schema: Schema<ConfigSchema> = {
  port: {
    doc: 'The port that the service listens on',
    env: 'PORT',
    format: 'int',
    default: 8080,
  },
  environment: {
    doc: 'The environment that Node.js is running in',
    env: 'NODE_ENV',
    format: ['development', 'staging', 'production', 'test'],
    default: 'development',
  },
  awsRegion: {
    doc: 'The AWS region for SES. Optional, logs mail to console if absent',
    env: 'AWS_REGION',
    format: '*',
    default: 'ap-southeast-1',
  },
  session: {
    name: {
      doc: 'Name of session ID cookie to set in response',
      env: 'SESSION_NAME',
      default: 'sgspotlight',
      format: String,
    },
    secret: {
      doc: 'A secret string used to generate sessions for users',
      env: 'SESSION_SECRET',
      default: 'toomanysecrets',
      format: String,
    },
    cookie: {
      maxAge: {
        doc: 'The maximum age for a cookie, expressed in ms',
        env: 'COOKIE_MAX_AGE',
        format: 'int',
        default: 24 * 60 * 60 * 1000, // 24 hours
      },
    },
  },
  db: {
    host: {
      doc: 'Database hostname',
      env: 'DB_HOST',
      default: 'localhost',
      format: String,
    },
    username: {
      doc: 'Database username',
      env: 'DB_USERNAME',
      default: '',
      format: 'required-string',
    },
    password: {
      doc: 'Database password',
      env: 'DB_PASSWORD',
      default: '',
      format: String,
    },
    port: {
      doc: 'Database host',
      env: 'DB_HOST',
      default: 5432,
      format: 'int',
    },
    database: {
      doc: 'Database host',
      env: 'DB_HOST',
      default: 'spotlight_db',
      format: String,
    },
  },
  otp: {
    expiry: {
      doc: 'The number of seconds that an OTP is valid for a user',
      env: 'OTP_EXPIRY',
      format: 'int',
      default: 300,
    },
    secret: {
      doc: 'A secret string used to generate TOTPs for users',
      env: 'OTP_SECRET',
      format: '*',
      default: 'toomanysecrets',
    },
    numValidPastWindows: {
      doc: 'The number of past windows for which tokens should be considered valid, where a window is the duration that an OTP is valid for, e.g. OTP expiry time.',
      env: 'OTP_NUM_VALID_PAST_WINDOWS',
      format: 'int',
      default: 1,
    },
    numValidFutureWindows: {
      doc: 'The number of future windows for which tokens should be considered valid, where a window is the duration that an OTP is valid for, e.g. OTP expiry time.',
      env: 'OTP_NUM_VALID_FUTURE_WINDOWS',
      format: 'int',
      default: 0,
    },
  },
  health: {
    heapSizeThreshold: {
      doc: 'Heap size threshold before healthcheck fails (in bytes).',
      env: 'HEAP_SIZE_THRESHOLD',
      format: 'int',
      // TODO: Set to a more reasonable value depending on the instance size used.
      default: 200 * 1024 * 1024, // 200MB
    },
    rssThreshold: {
      doc: 'Resident set size threshold before healthcheck fails (in bytes).',
      env: 'RSS_THRESHOLD',
      format: 'int',
      // TODO: Set to a more reasonable value depending on the instance size used.
      default: 3000 * 1024 * 1024, // 3000MB
    },
  },
}

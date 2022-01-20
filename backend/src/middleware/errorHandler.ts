import {
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Response } from 'express'
import { Message } from './types'
import _ from 'lodash'

@Catch()
export class ErrorHandler extends BaseExceptionFilter {
  determineStatusCode(error: unknown): number {
    if (error instanceof HttpException) return error.getStatus()
    switch (_.get(error, 'name')) {
      case 'SequelizeForeignKeyConstraintError':
        return HttpStatus.BAD_REQUEST
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
  catch(error: unknown, host: ArgumentsHost) {
    Logger.error(error)
    const response = host.switchToHttp().getResponse<Response>()
    const statusCode = this.determineStatusCode(error)
    const messageObj: Message = _.pick(error, 'message') as Message
    response.status(statusCode).json({
      statusCode,
      errorName: _.get(error, 'name'),
      message: messageObj.message,
    })
  }
}

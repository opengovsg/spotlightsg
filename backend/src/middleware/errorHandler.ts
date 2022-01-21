import {
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Response } from 'express'
import _ from 'lodash'

/**
 * Error Handler middleware that abstracts out error handling from controller and service classes.
 * Note that to retrieve the error message, there are 3 structures to handle:
 * 1. error.response.message (from class-validator)
 * 2. error.message (from sequelize errors)
 * 3. error.response (from throwing custom HttpException using nestjs)
 */
@Catch()
export class ErrorHandler extends BaseExceptionFilter {
  determineStatusCode(error: unknown): number {
    if (error instanceof HttpException) return error.getStatus()
    switch (_.get(error, 'name')) {
      case 'SequelizeUniqueConstraintError':
        return HttpStatus.BAD_REQUEST
      case 'SequelizeForeignKeyConstraintError':
        return HttpStatus.NOT_FOUND
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
  determineErrorMessage(error: unknown): string {
    const response = _.get(error, 'response')
    if (!response) return _.get(error, 'message')
    if (typeof response === 'string') return response
    return _.get(response, 'message')
  }
  catch(error: unknown, host: ArgumentsHost) {
    Logger.error(error)
    const response = host.switchToHttp().getResponse<Response>()
    const statusCode = this.determineStatusCode(error)
    response.status(statusCode).json({
      statusCode,
      errorName: _.get(error, 'name'),
      message: this.determineErrorMessage(error),
    })
  }
}

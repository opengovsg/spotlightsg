import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { HelmetMiddleware } from 'middlewares/helmet.middleware'
import { SessionMiddleware } from 'middlewares/session.middleware'
import { ConfigModule } from 'config/config.module'
import { AuthModule } from 'auth/auth.module'
import { OtpModule } from 'otp/otp.module'
import { MailerModule } from 'mailer/mailer.module'
import { TerminusModule } from '@nestjs/terminus'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    ConfigModule,
    OtpModule,
    MailerModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'jason',
      password: '',
      database: 'spotlight_db',
      autoLoadModels: true, // TO-DO: remove in production
      synchronize: true, // TO-DO: remove in production
    }),
    AuthModule,
    TerminusModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // Apply global middlewares
    consumer.apply(HelmetMiddleware, SessionMiddleware).forRoutes('*')
  }
}

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
import { ConfigService } from 'config/config.service'
import { JwtAuthGuard } from 'auth/jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { JwtStrategy } from 'auth/jwt.strategy'
import { PostsModule } from 'posts/posts.module'
import { CommentsModule } from 'comments/comments.module'

@Module({
  imports: [
    ConfigModule,
    OtpModule,
    MailerModule,
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('db.host'),
        port: config.get('db.port'),
        username: config.get('db.username'),
        password: config.get('db.password'),
        database: config.get('db.database'),
        autoLoadModels: true, // TO-DO: remove in production
        synchronize: true, // TO-DO: remove in production
      }),
    }),
    AuthModule,
    TerminusModule,
    HealthModule,
    PostsModule,
    CommentsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // Apply global middlewares
    consumer.apply(HelmetMiddleware, SessionMiddleware).forRoutes('*')
  }
}

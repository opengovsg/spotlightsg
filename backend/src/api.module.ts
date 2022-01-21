import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from 'config/config.module'
import { AuthModule } from 'auth/auth.module'
import { OtpModule } from 'otp/otp.module'
import { MailerModule } from 'mailer/mailer.module'
import { TerminusModule } from '@nestjs/terminus'
import { HealthModule } from './health/health.module'
import { ConfigService } from 'config/config.service'
import { JwtAuthGuard } from 'auth/jwt-auth.guard'
import { APP_GUARD, RouterModule } from '@nestjs/core'
import { JwtStrategy } from 'auth/jwt.strategy'
import { PostsModule } from 'posts/posts.module'
import { CommentsModule } from 'comments/comments.module'
import { FollowModule } from 'follow/follow.module'

const apiModules = [
  OtpModule,
  MailerModule,
  AuthModule,
  TerminusModule,
  HealthModule,
  PostsModule,
  CommentsModule,
  FollowModule,
]

@Module({
  imports: [
    ConfigModule,
    ...apiModules,
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
    RouterModule.register([
      {
        path: 'api',
        children: apiModules,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
  ],
})
export class ApiModule {}

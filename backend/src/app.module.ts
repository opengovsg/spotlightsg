import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { HelmetMiddleware } from 'middlewares/helmet.middleware'
import { SessionMiddleware } from 'middlewares/session.middleware'
import { ServeStaticModule } from '@nestjs/serve-static'
import { JwtAuthGuard } from 'auth/jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { JwtStrategy } from 'auth/jwt.strategy'
import { join } from 'path'
import { ApiModule } from './api.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
      serveStaticOptions: {
        maxAge: 2 * 60 * 60 * 1000, // 2 hours, same as cloudflare
        setHeaders: function (res, path) {
          // set maxAge to 0 for root index.html
          if (
            path ===
            join(__dirname, '..', '..', 'frontend', 'build', 'index.html')
          ) {
            res.setHeader('Cache-control', 'public, max-age=0')
          }
        },
      },
    }),
    ApiModule,
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
    consumer.apply(HelmetMiddleware, SessionMiddleware).forRoutes('/api/*')
  }
}

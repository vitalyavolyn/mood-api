import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { APP_GUARD } from '@nestjs/core'
import { HealthController } from './health/health.controller'
import { UserModule } from './user/user.module'
import { AuthGuard } from './auth/auth.guard'
import { StatsController } from './stats/stats.controller'
import { EntriesModule } from './entries/entries.module'
import { ThemesModule } from './themes/themes.module'
import { ActivitiesModule } from './activities/activities.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION_URI),
    UserModule,
    EntriesModule,
    ThemesModule,
    ActivitiesModule,
  ],
  controllers: [HealthController, StatsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

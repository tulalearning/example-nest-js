import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/modules/users/users.module';
import { LeaveRequestsModule } from './modules/leave-requests/leave-requests.module';
import { LeaveTypesModule } from './modules/leave-types/leave-types.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      username: 'postgres',
      password: 'banana08',
      database: 'example-nest-js-db',
      host: 'localhost',
      dialect: 'postgres',
      port: 5432,
      autoLoadModels: true, // Automatically load models from database
      minifyAliases: true, // to avoid Postgres alias character limit of 64
    }),
    LeaveRequestsModule,
    LeaveTypesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from './users/entities/users.entity';
import { ApplicationsModule } from './applications/applications.module';
import { ApplicationsModel } from './applications/entities/applications.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'application-tracker',
      entities: [UsersModel, ApplicationsModel],
      synchronize: true,
    }),
    UsersModule,
    ApplicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

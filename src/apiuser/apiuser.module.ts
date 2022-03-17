import { Module } from '@nestjs/common';
import { ApiuserService } from './apiuser.service';
import { ApiuserController } from './apiuser.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [ApiuserController],
  providers: [ApiuserService]
})
export class ApiuserModule {}

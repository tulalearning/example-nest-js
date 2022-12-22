import { Module } from '@nestjs/common';
import { LeaveTypesService } from './leave-types.service';
import { LeaveTypesController } from './leave-types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LeaveType } from './entities/leave-type.entity';

@Module({
  imports: [SequelizeModule.forFeature([LeaveType])],
  controllers: [LeaveTypesController],
  providers: [LeaveTypesService],
})
export class LeaveTypesModule {}

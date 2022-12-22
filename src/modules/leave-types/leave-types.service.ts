import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { LeaveType } from './entities/leave-type.entity';

@Injectable()
export class LeaveTypesService {
  constructor(
    @InjectModel(LeaveType)
    private leaveTypeModel: typeof LeaveType,
  ) {}

  async create(createLeaveTypeDto: CreateLeaveTypeDto) {
    const leaveType = await this.leaveTypeModel.create(createLeaveTypeDto);

    return leaveType;
  }

  async findAll() {
    const leaveTypes = await this.leaveTypeModel.findAll();

    return { data: leaveTypes };
  }

  async findOne(id: number) {
    const leaveType = await this.leaveTypeModel.findOne({ where: { id } });

    return leaveType;
  }

  async update(id: number, updateLeaveTypeDto: UpdateLeaveTypeDto) {
    const [affectedRow, result] = await this.leaveTypeModel.update(
      updateLeaveTypeDto,
      { where: { id }, returning: true },
    );

    if (affectedRow === 0) {
      throw new NotFoundException();
    }

    const [leaveType] = result;

    return leaveType;
  }

  async remove(id: number) {
    const affectedRow = await this.leaveTypeModel.destroy({
      where: { id },
    });

    if (affectedRow === 0) {
      throw new NotFoundException();
    }
  }
}

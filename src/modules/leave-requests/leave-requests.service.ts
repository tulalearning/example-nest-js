import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { LeaveRequest } from './entities/leave-request.entity';

@Injectable()
export class LeaveRequestsService {
  constructor(
    @InjectModel(LeaveRequest)
    private leaveRequestModel: typeof LeaveRequest,
  ) {}

  async create(createLeaveRequestDto: CreateLeaveRequestDto) {
    const leaveRequest = await this.leaveRequestModel.create(
      createLeaveRequestDto,
    );

    return leaveRequest;
  }

  async findAll() {
    const leaveRequests = await this.leaveRequestModel.findAll();

    return { data: leaveRequests };
  }

  async findOne(id: number) {
    const leaveRequest = await this.leaveRequestModel.findOne({
      where: { id },
    });

    return leaveRequest;
  }

  //This Case update apprver answer
  async update(id: number, updateLeaveRequestDto: UpdateLeaveRequestDto) {
    const [affectedRow, result] = await this.leaveRequestModel.update(
      updateLeaveRequestDto,
      { where: { id }, returning: true },
    );

    if (affectedRow === 0) {
      throw new NotFoundException();
    }

    const [leaveRequest] = result;

    return leaveRequest;
  }

  async remove(id: number) {
    const affectedRow = await this.leaveRequestModel.destroy({
      where: { id, isApprove: null },
    });

    if (affectedRow === 0) {
      throw new NotFoundException();
    }
  }
}

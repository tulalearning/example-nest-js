import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table,
  } from 'sequelize-typescript';
  import { LeaveType } from 'src/modules/leave-types/entities/leave-type.entity';
  import { User } from 'src/modules/users/entities/user.entity';
  
  @Table
  export class LeaveRequest extends Model<LeaveRequest> {
    //Define Column
    @Column
    startDate: Date;
  
    @Column
    endDate: Date;
  
    @Column
    note: string;
  
    @Column
    isApprove: boolean;
  
    //Define keys relation
    @ForeignKey(() => LeaveType)
    @Column
    leaveTypeId: number;
  
    @ForeignKey(() => User)
    @Column
    requesterId: number;
  
    @ForeignKey(() => User)
    @Column
    approverId: number;
  
    //Define associations
    @BelongsTo(() => LeaveType)
    leaveRequest: LeaveType;
  
    @BelongsTo(() => User, 'requesterId')
    requester: User;
  
    @BelongsTo(() => User, 'approverId')
    approver: User;
  }
  
import { Column, Default, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  //Define Column
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Default(true)
  @Column
  isActive: boolean;

  //Define keys relation

  //Define associations
}

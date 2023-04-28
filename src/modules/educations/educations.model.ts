import {Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {users} from "../users/users.model";
@Table
export class educations extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true
  })
  id: string;

  @ForeignKey(() => users)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_id'
  })
  user_id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  },)
  title: string;

  @Column({
    type: "TIMESTAMP",
    allowNull: false,
  },)
  start_date: string;

  @Column({
    type: "TIMESTAMP",
    defaultValue: null,
    allowNull: true,
  },)
  end_date: string;

  @BelongsTo(() => users)
  users: users;

}
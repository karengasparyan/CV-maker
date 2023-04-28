import {Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {users} from "../users/users.model";
import {plans} from "./plans.model";
@Table
export class users_plans extends Model {
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

  @ForeignKey(() => plans)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'plan_id'
  })
  plan_id: string;

  @BelongsTo(() => users)
  user: users;

  @BelongsTo(() => plans)
  plan: plans;

}
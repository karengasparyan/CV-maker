import {Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {users} from "../users/users.model";
import {plans} from "./plans.model";
@Table
export class subscriptions extends Model {
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

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    // stripe subscription id
  })
  sub_id: string;

  @Column({
    type: "TIMESTAMP",
    allowNull: false,
    // stripe
  })
  expired: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    // stripe
  })
  status: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    // stripe
  })
  discount: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    // stripe
  })
  cancel_at: boolean;

  @BelongsTo(() => users)
  users: users;

  @BelongsTo(() => plans)
  plans: plans;

}
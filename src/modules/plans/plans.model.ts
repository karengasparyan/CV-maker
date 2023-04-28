import {Table, Column, Model, DataType, HasMany, BelongsToMany} from 'sequelize-typescript';
import {users} from "../users/users.model";
import {users_plans} from "./users_plans.model";
import {subscriptions} from "./subscriptions.model";
@Table
export class plans extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true
  })
  id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  },)
  number: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },)
  disabled: boolean;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0
  },)
  price: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: null
  },)
  product_id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: null
  },)
  price_id: string;

  @BelongsToMany(() => users, () => users_plans,'plan_id')
  users: users;

  @HasMany(() => users_plans)
  plansUsers: users[];

  @HasMany(() => subscriptions)
  subscriptions: subscriptions[];

}
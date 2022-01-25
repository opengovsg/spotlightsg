import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript'
import { Post, User } from '.'

@Table({ tableName: 'upvotes' })
export class Upvote extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id!: number

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: 'upvote_unique',
  })
  postId!: number

  @BelongsTo(() => Post, {
    onDelete: 'cascade',
  })
  post!: Post

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: 'upvote_unique',
  })
  userId!: number

  @BelongsTo(() => User)
  user!: User

  @CreatedAt
  createdAt!: Date

  @UpdatedAt
  updatedAt!: Date
}

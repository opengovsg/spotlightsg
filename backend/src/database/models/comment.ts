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

@Table({ tableName: 'comments' })
export class Comment extends Model {
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
  })
  postId!: number

  @BelongsTo(() => Post, {
    onDelete: 'CASCADE',
  })
  post!: Post

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number

  @BelongsTo(() => User)
  user!: User

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string

  @CreatedAt
  createdAt!: Date

  @UpdatedAt
  updatedAt!: Date
}

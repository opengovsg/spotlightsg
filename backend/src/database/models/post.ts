import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { User, Comment, UserModified, CommentModified } from '.'

@Table({ tableName: 'posts' })
export class Post extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id!: number

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  issue!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  actionsTaken!: string

  @BelongsTo(() => User)
  user!: User

  @HasMany(() => Comment)
  comments!: Comment[]

  @CreatedAt
  createdAt!: Date

  @UpdatedAt
  updatedAt!: Date
}

export type PostModified = {
  id: number
  issue: string
  actionsTaken: string
  createdAt: Date
  updatedAt: Date
  user: UserModified
  comments?: CommentModified[]
}

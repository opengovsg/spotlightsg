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
import { User, Comment, Follow, Upvote } from '.'

export type PostAttributes = {
  id: number
  userId: number
  title: string
  issue: string
  actionsTaken: string
  createdAt: Date
  updatedAt: Date
}

export type PostCreationAttributes = {
  userId: number
  title: string
  issue: string
  actionsTaken: string
}

@Table({ tableName: 'posts' })
export class Post extends Model<PostAttributes, PostCreationAttributes> {
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
  title!: string

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

  @HasMany(() => Comment, {
    onDelete: 'CASCADE',
  })
  comments!: Comment[]

  @HasMany(() => Follow, {
    onDelete: 'CASCADE',
  })
  follows!: Follow[]

  @HasMany(() => Upvote)
  upvotes!: Upvote[]

  @CreatedAt
  createdAt!: Date

  @UpdatedAt
  updatedAt!: Date
}

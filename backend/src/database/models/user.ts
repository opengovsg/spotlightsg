import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript'
import { Post, Comment, Follow } from '.'

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id!: number

  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  email!: string

  @HasMany(() => Post)
  posts!: Post[]

  @HasMany(() => Comment)
  comments!: Comment[]

  @HasMany(() => Follow)
  follows!: Follow[]

  @CreatedAt
  createdAt!: Date

  @UpdatedAt
  updatedAt!: Date
}

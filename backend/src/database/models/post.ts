import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import { Comment } from '.'

@Table({ tableName: 'posts' })
export class Post extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id!: number

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

  @HasMany(() => Comment)
  comments!: Comment[]

  @CreatedAt
  createdAt!: Date

  @UpdatedAt
  updatedAt!: Date
}

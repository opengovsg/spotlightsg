import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'
import { Post, User, Comment } from '../database/models'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post
  ) {}

  async getAll(): Promise<Post[]> {
    return this.postModel.findAll({
      include: [
        {
          model: User,
          attributes: ['email'],
        },
        {
          model: Comment,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('comments')), 'commentsCount'],
        ],
      },
      group: ['Post.id', 'user.id'],
    })
  }

  async getUsingPostId(postId: number): Promise<Post | null> {
    return this.postModel.findOne({
      where: { id: postId },
      include: [
        {
          model: User,
          attributes: ['email'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['email'],
            },
          ],
        },
      ],
    })
  }

  async create(
    userId: number,
    issue: string,
    actionsTaken: string
  ): Promise<Post> {
    const post = await this.postModel.create({
      userId,
      issue,
      actionsTaken,
    })
    return post
  }
}

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Post, User, Comment } from '../database/models'
import _ from 'lodash'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post
  ) {}

  // TODO: to shift method to utils module should there be other modules that require masking of emails
  maskEmail(userField: User): void {
    const split = userField.email.split('@')
    userField.email = _.last(split)!
  }

  async getAll(): Promise<Post[]> {
    return this.postModel.findAll({
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    })
  }

  async getAllAndMaskEmail(): Promise<Post[]> {
    const allPosts = await this.getAll()
    allPosts.forEach((post) => this.maskEmail(post.user))
    return allPosts
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

  async getUsingPostIdAndMaskEmail(postId: number): Promise<Post | null> {
    const post = await this.getUsingPostId(postId)
    if (post) {
      this.maskEmail(post.user)
      post.comments.forEach((comment) => this.maskEmail(comment.user))
    }
    return post
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

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import {
  Post,
  User,
  Comment,
  UserModified,
  PostModified,
  CommentModified,
} from '../database/models'
import _ from 'lodash'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post
  ) {}

  // TODO: to shift method to utils module should there be other modules that require masking of emails
  maskEmail(userField: User): UserModified {
    const split = userField.email.split('@')
    const emailDomain = _.last(split)!
    return {
      emailDomain,
    }
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

  async getAllAndMaskEmail(): Promise<PostModified[]> {
    const allPosts = await this.getAll()
    return allPosts.map((post) => {
      return {
        id: post.id,
        issue: post.issue,
        actionsTaken: post.actionsTaken,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user: this.maskEmail(post.user),
      } as PostModified
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

  async getUsingPostIdAndMaskEmail(
    postId: number
  ): Promise<PostModified | null> {
    const post = await this.getUsingPostId(postId)
    if (post) {
      return {
        id: post.id,
        issue: post.issue,
        actionsTaken: post.actionsTaken,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user: this.maskEmail(post.user),
        comments: post.comments.map((comment) => {
          return {
            id: comment.id,
            user: this.maskEmail(comment.user),
            content: comment.content,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
          } as CommentModified
        }),
      } as PostModified
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

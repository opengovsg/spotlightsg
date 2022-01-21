import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Post, User, Comment } from '../database/models'
import _ from 'lodash'
import { Sequelize } from 'sequelize-typescript'
import { UserEmailDomain } from '../auth/types'
import {
  PostStrippedWithCommentsCountAndOriginalUser,
  PostStrippedWithCommentsCountAndUserEmailDomainAndAccess,
  PostStrippedWithUserEmailDomainAndCommentAndAccess,
} from './types'
import { CommentWithUser } from 'comments/types'
@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post
  ) {}

  // TODO: to shift method to utils module should there be other modules that require masking of emails
  maskEmail(userField: User): UserEmailDomain {
    const split = userField.email.split('@')
    const emailDomain = _.last(split)!
    return {
      emailDomain,
    }
  }

  async getAll(): Promise<PostStrippedWithCommentsCountAndOriginalUser[]> {
    // TODO update AllPostsResponseDto with user email attributes
    const models = await this.postModel.findAll({
      include: [
        {
          model: User,
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

    const posts = models.map((model) => ({
      ...model.get({ plain: true }),
      commentsCount: parseInt(String(model.get('commentsCount'))),
    }))

    return posts
  }

  async getAllAndMaskEmail(
    user: Express.User
  ): Promise<PostStrippedWithCommentsCountAndUserEmailDomainAndAccess[]> {
    const allPosts = await this.getAll()
    return allPosts.map((post) => {
      return {
        id: post.id,
        title: post.title,
        issue: post.issue,
        actionsTaken: post.actionsTaken,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user: this.maskEmail(post.user),
        commentsCount: post.commentsCount,
        canManage: user.id === post.user.id,
      }
    })
  }

  async getUsingPostId(postId: number): Promise<Post | null> {
    return this.postModel.findOne({
      where: { id: postId },
      include: [
        {
          model: User,
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
    postId: number,
    user: Express.User
  ): Promise<PostStrippedWithUserEmailDomainAndCommentAndAccess | null> {
    const post = await this.getUsingPostId(postId)
    if (post) {
      return {
        id: post.id,
        title: post.title,
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
          } as CommentWithUser
        }),
        canManage: user.id === post.user.id,
      }
    }
    return post
  }

  async create(
    userId: number,
    title: string,
    issue: string,
    actionsTaken: string
  ): Promise<Post> {
    return this.postModel.create({
      userId,
      title,
      issue,
      actionsTaken,
    })
  }
}

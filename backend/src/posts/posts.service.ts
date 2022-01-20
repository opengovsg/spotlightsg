import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Post, User, Comment } from '../database/models'
import _ from 'lodash'
import { Sequelize } from 'sequelize-typescript'
import { UserEmailDomain } from '../auth/types'
import {
  PostStrippedWithCommentsCountAndOriginalUser,
  PostStrippedWithCommentsCountAndUserEmailDomain,
  PostStrippedWithUserEmailDomainAndComment,
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
    // Need to cast because of additional attributes
    // TODO update AllPostsResponseDto with user email attributes
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
    }) as Promise<unknown> as Promise<
      PostStrippedWithCommentsCountAndOriginalUser[]
    >
  }

  async getAllAndMaskEmail(): Promise<
    PostStrippedWithCommentsCountAndUserEmailDomain[]
  > {
    const allPosts = await this.getAll()
    return allPosts.map((post) => {
      return {
        id: post.id,
        issue: post.issue,
        actionsTaken: post.actionsTaken,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user: this.maskEmail(post.user),
        commentsCount: post.commentsCount,
      } as PostStrippedWithCommentsCountAndUserEmailDomain
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
  ): Promise<PostStrippedWithUserEmailDomainAndComment | null> {
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
          } as CommentWithUser
        }),
      } as PostStrippedWithUserEmailDomainAndComment
    }
    return post
  }

  async create(
    userId: number,
    issue: string,
    actionsTaken: string
  ): Promise<Post> {
    return this.postModel.create({
      userId,
      issue,
      actionsTaken,
    })
  }
}

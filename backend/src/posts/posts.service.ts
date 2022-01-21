import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Post, User, Comment, PostAttributes, Follow } from '../database/models'
import _ from 'lodash'
import { Sequelize } from 'sequelize-typescript'
import { UserEmailDomain } from '../auth/types'
import { PostWithLongDetails, PostWithShortDetails } from './types'
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

  async getAll(): Promise<
    (PostAttributes & {
      user: User
      commentsCount: number
      followsCount: number
    })[]
  > {
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
        {
          model: Follow,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('comments')), 'commentsCount'],
          [Sequelize.fn('COUNT', Sequelize.col('follows')), 'followsCount'],
        ],
      },
      group: ['Post.id', 'user.id'],
    })

    const posts = models.map((model) => ({
      ...model.get({ plain: true }),
      commentsCount: parseInt(String(model.get('commentsCount'))),
      followsCount: parseInt(String(model.get('followsCount'))),
    })) as (PostAttributes & {
      user: User
      commentsCount: number
      followsCount: number
    })[]

    return posts
  }

  async getAllAndMaskEmail(
    user: Express.User
  ): Promise<PostWithShortDetails[]> {
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
        isFollowing: false, // TODO this is fake
        followsCount: post.followsCount,
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
          model: Follow,
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
  ): Promise<PostWithLongDetails | null> {
    const post = await this.getUsingPostId(postId)
    if (post) {
      console.log(post.follows)
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
        isFollowing: post.follows.some((follow) => follow.userId === user.id),
        followsCount: post.follows.length,
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

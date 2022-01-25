import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import {
  Post,
  User,
  Comment,
  PostAttributes,
  Follow,
  Upvote,
} from '../database/models'
import _ from 'lodash'
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

  async getAll(user: Express.User): Promise<
    (PostAttributes & {
      user: User
      commentsCount: number
      followsCount: number
      isFollowing: boolean
      upvoteCount: number
    })[]
  > {
    const models = await this.postModel.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          attributes: ['id'],
        },
        {
          model: Follow,
          attributes: ['userId'],
        },
        {
          model: Upvote,
          attributes: ['postId'],
        },
      ],
    })

    const posts = models.map((model) => ({
      ...model.get({ plain: true }),
      commentsCount: model.comments.length,
      followsCount: model.follows.length,
      isFollowing: model.follows.some((follow) => follow.userId === user.id),
      upvoteCount: model.upvotes.filter((upvote) => upvote.postId === model.id)
        .length,
    })) as (PostAttributes & {
      user: User
      commentsCount: number
      followsCount: number
      isFollowing: boolean
      upvoteCount: number
    })[]

    return posts
  }

  async getAllAndMaskEmail(
    user: Express.User
  ): Promise<PostWithShortDetails[]> {
    const allPosts = await this.getAll(user)
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
        isFollowing: post.isFollowing,
        followsCount: post.followsCount,
        upvoteCount: post.upvoteCount,
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
          attributes: ['userId'],
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
        upvoteCount: post.upvotes.filter((upvote) => upvote.postId === post.id)
          .length,
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

  async getUsingPostIdAndUserId(
    postId: number,
    userId: number
  ): Promise<Post | null> {
    return this.postModel.findOne({
      where: { id: postId, userId },
    })
  }

  async edit(
    postId: number,
    userId: number,
    title?: string,
    issue?: string,
    actionsTaken?: string
  ): Promise<Post> {
    const [, post] = await this.postModel.update(
      {
        title,
        issue,
        actionsTaken,
      },
      { where: { id: postId, userId }, returning: true }
    )
    return post ? post[0] : post
  }

  async delete(postId: number, userId: number): Promise<number> {
    return this.postModel.destroy({
      where: { id: postId, userId },
      cascade: true,
    })
  }
}

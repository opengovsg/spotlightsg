import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Post } from 'database/models'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post
  ) {}

  async getAll(): Promise<Post[]> {
    return this.postModel.findAll()
  }

  async getUsingPostId(postId: number): Promise<Post | null> {
    return this.postModel.findOne({ where: { id: postId } })
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

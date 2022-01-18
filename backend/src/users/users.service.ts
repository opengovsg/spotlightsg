import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from '../database/models'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async findOrCreate(email: string): Promise<User | undefined> {
    const [user] = await this.userModel.findOrCreate({ where: { email } })
    return user
  }
}

import { Post } from 'database/models'

export type AllPostsResponseDto = (Post & { commentsCount: number })[]

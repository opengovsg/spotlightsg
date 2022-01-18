import { Post } from '~services/types'

export function filterPosts(search: string, posts: Post[]): Post[] {
  // split search into words and filter by non-empty string
  const words = search
    .split(/\s/)
    .filter((s) => s)
    .map((word) => word.toLocaleLowerCase())
  return posts.filter((post) =>
    words.every((word) => post.issue.toLocaleLowerCase().includes(word)),
  )
}

import { Post } from '~services/types'

export function prettifyEmailDomain(domain: string): string {
  switch (domain) {
    case 'open.gov.sg':
      return 'OGP'
    case 'pa.gov.sg':
      return "People's Association"
    // TODO add more
    default:
      return domain
  }
}

export function filterPosts<T extends Post>(
  posts: T[],
  search: string,
  emailDomain?: string,
): T[] {
  // split search into words and filter by non-empty string
  const words = search
    .split(/\s/)
    .filter((s) => s)
    .map((word) => word.toLocaleLowerCase())
  const getSearchableFields = (post: T) =>
    [
      post.title,
      post.issue,
      post.actionsTaken,
      post.user.emailDomain,
      prettifyEmailDomain(post.user.emailDomain),
    ].map((s) => s.toLowerCase())
  return posts.filter(
    (post) =>
      (!emailDomain || post.user.emailDomain === emailDomain) &&
      words.every((word) =>
        getSearchableFields(post).some((text) => text.includes(word)),
      ),
  )
}

import { Post } from '~services/types'

export function filterPosts<T extends Post>(search: string, posts: T[]): T[] {
  // split search into words and filter by non-empty string
  const words = search
    .split(/\s/)
    .filter((s) => s)
    .map((word) => word.toLocaleLowerCase())
  return posts.filter((post) =>
    words.every((word) => post.issue.toLocaleLowerCase().includes(word)),
  )
}

export function prettifyEmailDomain(domain: string): string {
  const getPrettyDomain = (domain: string) => {
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
  return `someone from ${getPrettyDomain(domain)}`
}

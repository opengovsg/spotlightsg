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

export function prettifyEmail(email: string): string {
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
  const domain = email.split('@')[1]
  return `someone from ${getPrettyDomain(domain)}`
}

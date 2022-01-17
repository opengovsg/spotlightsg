import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Button, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react'

import { BROWSE_ROUTE, HOMEPAGE_ROUTE, NEW_POST_ROUTE } from '~constants/routes'
import { getAllPosts } from '~services/SpotlightApi'
import { GetAllPostsResponse } from '~services/types'
import AppHeader from '~components/AppHeader'
import PostCard from '~components/PostCard'
import PostModal from '~components/PostModal'
import Search from '~components/Search'

const Landing = (): JSX.Element => {
  const history = useHistory()
  const [posts, setPosts] = useState<GetAllPostsResponse>([])
  const params = useParams<{ postId: string | undefined }>()
  const [isPostOpen, setIsPostOpen] = useState<boolean>(!!params.postId)

  async function initPosts() {
    const posts = await getAllPosts()
    setPosts(posts)
  }
  useEffect(() => {
    initPosts()
  }, [])

  useEffect(() => {
    setIsPostOpen(!!params.postId)
  }, [params])

  const onClosePost = () => {
    history.push(HOMEPAGE_ROUTE)
  }

  return (
    <>
      <AppHeader />
      <PostModal isOpen={isPostOpen} onClose={onClosePost} id={params.postId} />
      <VStack p="50px" align="stretch">
        <Flex justify="space-between" align="flex-start">
          <Text textStyle="display1" color="primary.400">
            Have a problem?
          </Text>
          <Button as={Link} to={BROWSE_ROUTE} colorScheme="primary">
            Browse Submitted Problems
          </Button>
        </Flex>
        <VStack align="start" pt="50px">
          <Text>How would you describe your issue with a few keywords?</Text>
          <Search onSearch={(v) => console.log(v)} />
        </VStack>
        <SimpleGrid columns={2} spacing="30px" pt="50px">
          {posts.map((post) => (
            <PostCard
              id={post.id}
              key={post.id}
              route={`/home/posts/${post.id}`}
              previewText={post.issue}
            />
          ))}
        </SimpleGrid>
        <VStack p="32px">
          <Text textStyle="display2" pb="32px" color="primary.400">
            Can't find your issue?
          </Text>
          <Button as={Link} to={NEW_POST_ROUTE} colorScheme="primary">
            Submit Your Detailed Issue
          </Button>
        </VStack>
      </VStack>
    </>
  )
}

export default Landing

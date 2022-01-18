import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react'

import { filterPosts } from '~/helpers'

import { HOMEPAGE_ROUTE, NEW_POST_ROUTE } from '~constants/routes'
import { getAllPosts } from '~services/SpotlightApi'
import { Post } from '~services/types'
import AppHeader from '~components/AppHeader'
import PostCard from '~components/PostCard'
import PostModal from '~components/PostModal'
import Search from '~components/Search'

const Landing = (): JSX.Element => {
  const history = useHistory()
  const [posts, setPosts] = useState<Post[]>([])
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([])
  const params = useParams<{ postId: string | undefined }>()
  const [isPostOpen, setIsPostOpen] = useState<boolean>(!!params.postId)

  async function initPosts() {
    const posts = await getAllPosts()
    setPosts(posts)
    setDisplayedPosts(posts)
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

  const onSearch = (search: string) => {
    setDisplayedPosts(filterPosts(search, posts))
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
          <Button
            as={Link}
            to={NEW_POST_ROUTE}
            colorScheme="primary"
            leftIcon={<AddIcon />}
          >
            Submit your problem
          </Button>
        </Flex>
        <VStack align="start" pt="50px">
          <Search onSearch={onSearch} />
        </VStack>
        <SimpleGrid columns={2} spacing="30px" pt="50px">
          {displayedPosts.map((post) => (
            <PostCard
              id={post.id}
              key={post.id}
              route={`/home/posts/${post.id}`}
              previewText={post.issue}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </>
  )
}

export default Landing

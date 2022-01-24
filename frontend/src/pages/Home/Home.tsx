import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react'

import { filterPosts } from '~/helpers'

import { HOMEPAGE_ROUTE, NEW_POST_ROUTE } from '~constants/routes'
import { getAllPosts } from '~services/SpotlightApi'
import { PostWithCommentsCount } from '~services/types'
import AppHeader from '~components/AppHeader'
import OgpFooter from '~components/OgpFooter'
import PostCard from '~components/PostCard'
import PostModal from '~components/PostModal'
import Search from '~components/Search'

const Landing = (): JSX.Element => {
  const history = useHistory()
  const [posts, setPosts] = useState<PostWithCommentsCount[]>([])
  const [displayedPosts, setDisplayedPosts] = useState<PostWithCommentsCount[]>(
    [],
  )
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
          <Box>
            <Text textStyle="display1" color="primary.400">
              Have a problem?
            </Text>
            <Text textStyle="h4">
              Search for existing problems faced by others or post a new problem
              to seek for solutions
            </Text>
          </Box>
          <Button
            as={Link}
            to={NEW_POST_ROUTE}
            colorScheme="primary"
            leftIcon={<AddIcon />}
          >
            Submit your problem
          </Button>
        </Flex>
        <Box pt="40px">
          <Search onSearch={onSearch} />
        </Box>
        <SimpleGrid columns={2} spacing="30px" pt="50px">
          {displayedPosts.map((post) => (
            <PostCard
              id={post.id}
              key={post.id}
              title={post.title}
              previewText={post.issue}
              email={post.user.emailDomain}
              commentsCount={post.commentsCount}
              canManage={post.canManage}
              isFollowing={post.isFollowing}
              followsCount={post.followsCount}
            />
          ))}
        </SimpleGrid>
      </VStack>
      <OgpFooter />
    </>
  )
}

export default Landing

import { useEffect, useMemo, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { AddIcon } from '@chakra-ui/icons'
import { Box, Flex, Select, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import _ from 'lodash'

import { filterPosts, prettifyEmailDomain } from '~/helpers'

import { HOMEPAGE_ROUTE, NEW_POST_ROUTE } from '~constants/routes'
import { getAllPosts } from '~services/SpotlightApi'
import { PostWithCommentsCount } from '~services/types'
import AppHeader from '~components/AppHeader'
import OgpFooter from '~components/Footer'
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

  const [search, setSearch] = useState('')
  const [org, setOrg] = useState<string>()
  const organisations = useMemo(
    () =>
      _.uniq(posts.map((post) => post.user.emailDomain)).map((emailDomain) => ({
        value: emailDomain,
        text: prettifyEmailDomain(emailDomain),
      })),
    [posts],
  )

  useEffect(() => {
    setDisplayedPosts(filterPosts(posts, search, org))
  }, [search, org, posts])

  return (
    <>
      <AppHeader />
      <PostModal isOpen={isPostOpen} onClose={onClosePost} id={params.postId} />
      <VStack p="50px" align="stretch">
        <Flex justify="space-between" align="flex-start">
          <Box>
            <Text textStyle="display1" color="primary.400">
              Put problems in the spotlight.
            </Text>
            <Text textStyle="h4">
              Browse tech problems other officers are facing or post a new one
              to bring attention to it.
            </Text>
          </Box>
          <Button
            as={Link}
            to={NEW_POST_ROUTE}
            colorScheme="primary"
            leftIcon={<AddIcon />}
          >
            Post new problem
          </Button>
        </Flex>
        <Box pt="40px">
          <Flex gap="10px">
            <Box flexGrow={1}>
              <Search onSearch={setSearch} />
            </Box>
            <Box>
              <Select
                background="white"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                placeholder="Filter by Agency"
              >
                {organisations.map(({ value, text }) => (
                  <option value={value} key={value}>
                    {text}
                  </option>
                ))}
              </Select>
            </Box>
          </Flex>
        </Box>
        <SimpleGrid columns={2} spacing="30px" pt="50px">
          {displayedPosts.map((post) => (
            <PostCard
              id={post.id}
              createdAt={post.createdAt}
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

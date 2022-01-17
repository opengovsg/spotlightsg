import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Button, Flex, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react'

import { BROWSE_ROUTE, HOMEPAGE_ROUTE } from '~constants/routes'
import AppHeader from '~components/AppHeader'
import PostCard from '~components/PostCard'
import PostModal from '~components/PostModal'
import Search from '~components/Search'

const Landing = (): JSX.Element => {
  const history = useHistory()
  const params = useParams<{ postId: string | undefined }>()
  const [isPostOpen, setIsPostOpen] = useState<boolean>(!!params.postId)

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
          <PostCard id="a" route="/home/posts/a" />
          <PostCard id="b" route="/home/posts/b" />
          <PostCard id="c" route="/home/posts/c" />
          <PostCard id="d" route="/home/posts/d" />
          <PostCard id="e" route="/home/posts/e" />
        </SimpleGrid>
      </VStack>
    </>
  )
}

export default Landing

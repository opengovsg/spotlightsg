import React from 'react'
import { Link } from 'react-router-dom'
import { Center, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import { LOGIN_ROUTE } from '~constants/routes'
import AppHeader from '~components/AppHeader'
import OgpFooter from '~components/Footer'

import mainimg from '../../img/landing-main.svg'
import search from '../../img/search.svg'
import upvote from '../../img/upvote.svg'
import workchat from '../../img/workchat.svg'

import ImgWithTagline from './ImgWithTagline'

const getTagline = ({ title, text }: { title: string; text: string }) => (
  <Center h="100%">
    <VStack>
      <Text textStyle="h3" color="primary.500">
        {title}
      </Text>
      <Text>{text}</Text>
    </VStack>
  </Center>
)

const Landing = (): JSX.Element => {
  return (
    <>
      <AppHeader />
      <ImgWithTagline imgSrc={mainimg}>
        <VStack align="start">
          <Text textStyle="display2" color="primary.400">
            Shining spotlight on problems faced by public officers
          </Text>
          <SimpleGrid
            py="30px"
            templateColumns="100px 1fr"
            gap="10px"
            alignItems="center"
          >
            <Text textStyle="h1" color="primary.500">
              200
            </Text>
            <Text textStyle="h2">Problems Surfaced</Text>
            <Text textStyle="h1" color="primary.500">
              100
            </Text>
            <Text textStyle="h2">Replies From Other Public Officers</Text>
          </SimpleGrid>
          <Button as={Link} to={LOGIN_ROUTE} colorScheme="primary">
            Find help for your problems
          </Button>
        </VStack>
      </ImgWithTagline>
      <ImgWithTagline imgSrc={search} reverse>
        {getTagline({
          title: 'View challenges that public officers face at work',
          text: 'Post the technical challenges your face at work anonymously on Spotlight.',
        })}
      </ImgWithTagline>
      <ImgWithTagline imgSrc={upvote}>
        {getTagline({
          title: 'Upvote to cast a spotlight on issues',
          text: 'Surface commonly faced technical problems by many public officers.',
        })}
      </ImgWithTagline>
      <ImgWithTagline imgSrc={workchat} reverse>
        {getTagline({
          title: 'Connect with others who face the same issue',
          text: "Comment other people's issues and explore solutions or workarounds together on Spotlight.",
        })}
      </ImgWithTagline>
      <OgpFooter />
    </>
  )
}

export default Landing

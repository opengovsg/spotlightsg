import {
  Box,
  Divider,
  Flex,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'

import ogpLogo from '../../img/ogp-logo.svg'

const urlOgpWebsite = 'https://open.gov.sg'

function OgpFooter() {
  return (
    <>
      <Box as="footer" background="black" py="40px" color="white">
        <VStack mx="148px" spacing="40px" align="stretch">
          <Flex justify="space-between">
            <HStack>
              <Text textStyle="h4">Spotlight</Text>
              <Text textStyle="body2">
                shining light on problems faced by public officers
              </Text>
            </HStack>
            <HStack spacing="22px">
              <Link textDecor="initial">Help Center</Link>
              <Link textDecor="initial">Privacy</Link>
              <Link textDecor="initial">Terms of Use</Link>
              <Link textDecor="initial">Report Vulnerability</Link>
            </HStack>
          </Flex>
          <Divider />
          <Flex justify="space-between" align="end">
            <Box>
              <Text textStyle="caption1" mb="8px">
                Built by
              </Text>
              <a href={urlOgpWebsite}>
                <Image src={ogpLogo} alt="OGP Logo" w="150px" />
              </a>
            </Box>
            <Box>
              <Text textStyle="legal">
                &copy; 2022 Open Government Products, Government Technology
                Agency of Singapore
              </Text>
            </Box>
          </Flex>
        </VStack>
      </Box>
    </>
  )
}

export default OgpFooter

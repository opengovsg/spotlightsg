import React from 'react'
import { Box, Center, Image, SimpleGrid } from '@chakra-ui/react'

type ImgWithTaglineProps = {
  imgSrc: string
  reverse?: boolean
}

const ImgWithTagline: React.FC<ImgWithTaglineProps> = ({
  imgSrc,
  reverse = false,
  children,
}) => {
  return (
    <SimpleGrid columns={2} p="56px" gap="56px">
      {reverse ? (
        <>
          <Center>
            <Image src={imgSrc} />
          </Center>
          <Center>
            <Box>{children}</Box>
          </Center>
        </>
      ) : (
        <>
          <Center>
            <Box>{children}</Box>
          </Center>
          <Center>
            <Image src={imgSrc} />
          </Center>
        </>
      )}
    </SimpleGrid>
  )
}

export default ImgWithTagline

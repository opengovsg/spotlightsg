import React from 'react'
import { Box, Image, SimpleGrid } from '@chakra-ui/react'

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
          <Image src={imgSrc} />
          <Box>{children}</Box>
        </>
      ) : (
        <>
          <Box>{children}</Box>
          <Image src={imgSrc} />
        </>
      )}
    </SimpleGrid>
  )
}

export default ImgWithTagline

import React from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'

import Comment from '~components/Comment'
import NewComment from '~components/NewComment'

const Post: React.FC = () => {
  return (
    <Box>
      <Box whiteSpace="pre-line">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        vestibulum purus ac ullamcorper laoreet. Nulla in luctus sapien, in
        laoreet nisi. Aliquam sed dui a ligula consectetur varius. Sed nec
        fringilla enim. Phasellus non velit euismod, egestas erat sed, facilisis
        urna. Nunc eu tortor nec augue dictum gravida in eu lacus. Vivamus ac
        nulla gravida, placerat diam interdum, convallis libero. Sed mollis arcu
        vitae ante mollis, quis iaculis sem venenatis. In non vulputate purus,
        in vehicula purus. Donec ultrices erat vitae dolor dictum egestas.
        {'\n\n'}
        Donec ultricies ullamcorper dui, ut elementum sapien auctor in. Morbi
        placerat neque et iaculis pulvinar. Quisque rutrum commodo arcu. Ut
        rutrum tempus lacus, vehicula consequat elit venenatis sit amet.
        Phasellus sed enim sapien. Nunc lacinia ante tortor, sed vestibulum odio
        vehicula nec. Nulla eget ornare elit. Donec sit amet finibus sapien.
        Curabitur est dolor, accumsan efficitur maximus porttitor, fermentum sed
        arcu. Nulla in venenatis velit. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. Mauris vel ante
        tempus, volutpat orci at, ullamcorper metus. Donec nec velit sed ante
        commodo tempor.
        {'\n\n'}
        Pellentesque eu mattis nibh. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Etiam sed libero fermentum, mollis leo id, ornare odio.
        Donec in arcu mi. Phasellus posuere nulla quam, sed sagittis ex ornare
        sit amet. Aliquam ut placerat sapien. Vestibulum lacus ipsum, egestas
        eget massa quis, facilisis convallis augue. Vestibulum ante ipsum primis
        in faucibus orci luctus et ultrices posuere cubilia curae; In id est
        euismod enim rutrum tincidunt. Sed vestibulum erat eget tortor
        dignissim, id venenatis nisi porta. Donec volutpat elit ut risus
        posuere, vel finibus mi imperdiet. Aenean maximus leo porttitor massa
        facilisis pretium. Ut ex erat, pretium id maximus id, interdum eget
        diam.
      </Box>
      <Box mt="30px">
        <Text textStyle="h4">Comments</Text>
        <VStack spacing="10px" align="stretch">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </VStack>
      </Box>
      <Box mt="30px">
        <Text textStyle="h4">Add your reply</Text>
        <NewComment />
      </Box>
    </Box>
  )
}

export default Post

import React from 'react'
import { HStack, Text, Tooltip } from '@chakra-ui/react'

type IconTextProps = {
  icon: React.ReactNode
  text?: string
  tooltip?: string
}

const IconText: React.FC<IconTextProps> = ({ icon, text, tooltip }) => {
  return (
    <Tooltip isDisabled={!!tooltip} label={tooltip} hasArrow placement="top">
      <HStack p="10px" spacing="10px">
        {icon}
        {text && <Text>{text}</Text>}
      </HStack>
    </Tooltip>
  )
}

export default IconText

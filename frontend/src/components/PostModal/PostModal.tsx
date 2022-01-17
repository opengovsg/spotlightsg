import React from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

import Post from '~components/Post'

type PostModalProps = {
  id: string | undefined
  isOpen: boolean
  onClose: () => void
}

const PostModal: React.FC<PostModalProps> = ({ id, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Post id={id} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="primary" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PostModal

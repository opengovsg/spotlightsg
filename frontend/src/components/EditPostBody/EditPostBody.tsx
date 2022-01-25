import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'

import { editPost } from '~services/SpotlightApi'

type EditPostBodyProps = {
  postId: number
  defaultTitle: string
  defaultIssue: string
  defaultActionsTaken: string
  onCancel: () => void
  onSubmit: () => void
}

type FormValues = {
  title: string
  issue: string
  actionsTaken: string
}

const EditPostBody: React.FC<EditPostBodyProps> = ({
  postId,
  defaultTitle,
  defaultIssue,
  defaultActionsTaken,
  onCancel,
  onSubmit: onSubmitDone,
}) => {
  const formMethods = useForm<FormValues>()
  const { control, handleSubmit } = formMethods

  const onSubmit = async (body: FormValues) => {
    await editPost({ id: postId, body })
    onSubmitDone()
  }

  return (
    <Box>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack align="stretch" spacing="10px">
            <Controller
              name="title"
              control={control}
              defaultValue={defaultTitle}
              render={({ field: { value, onChange } }) => (
                <>
                  <Text textStyle="h4" color="primary.500" mt="30px">
                    Title
                  </Text>
                  <Input value={value} onChange={onChange} required />
                </>
              )}
            />
            <Controller
              name="issue"
              control={control}
              defaultValue={defaultIssue}
              render={({ field: { value, onChange } }) => (
                <>
                  <Text textStyle="h4" color="primary.500" mt="30px">
                    Issue
                  </Text>
                  <Textarea
                    value={value}
                    onChange={onChange}
                    background="white"
                    required
                  />
                </>
              )}
            />
            <Controller
              name="actionsTaken"
              control={control}
              defaultValue={defaultActionsTaken}
              render={({ field: { value, onChange } }) => (
                <>
                  <Text textStyle="h4" color="primary.500" mt="30px">
                    Actions Taken
                  </Text>
                  <Textarea
                    value={value}
                    onChange={onChange}
                    background="white"
                    required
                  />
                </>
              )}
            />
            <HStack>
              <Button onClick={onCancel}>Cancel</Button>
              <Button type="submit" colorScheme="primary">
                Save
              </Button>
            </HStack>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  )
}

export default EditPostBody

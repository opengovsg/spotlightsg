import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Box, Button, HStack, Text, Textarea, VStack } from '@chakra-ui/react'

type EditPostBodyProps = {
  defaultTitle: string
  defaultIssue: string
  defaultActionsTaken: string
  onCancel: () => void
}

type FormValues = {
  issue: string
  actionsTaken: string
}

const EditPostBody: React.FC<EditPostBodyProps> = ({
  defaultIssue,
  defaultActionsTaken,
  onCancel,
}) => {
  const formMethods = useForm<FormValues>()
  const { control, handleSubmit } = formMethods

  return (
    <Box>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(() => console.log('submit'))}>
          <VStack align="stretch" spacing="10px">
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

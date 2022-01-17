import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  FormLabel,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'

import { HOMEPAGE_ROUTE, POST_ROUTE } from '~constants/routes'
import { createPost } from '~services/SpotlightApi'
import AppHeader from '~components/AppHeader'

type FormValues = {
  issue: string
  actionsTaken: string
}

const NewPost = (): JSX.Element => {
  const history = useHistory()
  const formMethods = useForm<FormValues>()
  const { control, handleSubmit } = formMethods
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    const post = await createPost(data)
    history.push(`${HOMEPAGE_ROUTE}${POST_ROUTE}/${post.id}`)
  }

  return (
    <>
      <AppHeader />
      <Container>
        <VStack align="stretch" py="30px">
          <Text textStyle="display2" color="primary.400">
            Describe your problem
          </Text>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack align="stretch" spacing="10px" mt="20px">
                <Controller
                  name="issue"
                  control={control}
                  defaultValue=""
                  render={({ field: { value, onChange } }) => (
                    <FormLabel mr="0">
                      How would you describe your problem?
                      <Textarea
                        value={value}
                        onChange={onChange}
                        background="white"
                        required
                      />
                    </FormLabel>
                  )}
                />
                <Controller
                  name="actionsTaken"
                  control={control}
                  defaultValue=""
                  render={({ field: { value, onChange } }) => (
                    <FormLabel>
                      What are some ways you have tried to tackle this problem?
                      <Textarea
                        value={value}
                        onChange={onChange}
                        background="white"
                        required
                      />
                    </FormLabel>
                  )}
                />
                <Box>
                  <Button
                    type="submit"
                    colorScheme="primary"
                    isLoading={isLoading}
                  >
                    Submit
                  </Button>
                </Box>
              </VStack>
            </form>
          </FormProvider>
        </VStack>
      </Container>
    </>
  )
}

export default NewPost

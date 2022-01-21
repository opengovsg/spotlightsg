import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  FormLabel,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react'

import { HOMEPAGE_ROUTE, POST_ROUTE } from '~constants/routes'
import { createPost } from '~services/SpotlightApi'
import AppHeader from '~components/AppHeader'
import OgpFooter from '~components/OgpFooter'

type FormValues = {
  issue: string
  actionsTaken: string
}

const NewPost = (): JSX.Element => {
  const toast = useToast()
  const history = useHistory()
  const formMethods = useForm<FormValues>()
  const { control, handleSubmit } = formMethods
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      const post = await createPost(data)
      history.push(`${HOMEPAGE_ROUTE}${POST_ROUTE}/${post.id}`)
    } catch (error) {
      setIsLoading(false)
      toast({
        title: 'Error creating post',
        status: 'error',
      })
    }
  }

  return (
    <>
      <AppHeader />
      <Container>
        <VStack align="stretch" py="30px">
          <Box>
            <Button
              variant="link"
              colorScheme="primary"
              as={Link}
              to={HOMEPAGE_ROUTE}
            >
              <Text textStyle="caption2">
                <ArrowBackIcon />
                Back to main page
              </Text>
            </Button>
          </Box>
          <Text textStyle="display2" color="primary.500">
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
                      Tell us more about the problem that you're facing to help
                      others understand and suggest potential solutions.
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
                      What have you done so far to tackle this problem?
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
                <Box>
                  <Text textStyle="caption2">
                    Your identity will be kept anoymous when your problem is
                    published.
                  </Text>
                </Box>
              </VStack>
            </form>
          </FormProvider>
        </VStack>
      </Container>
      <OgpFooter />
    </>
  )
}

export default NewPost

import { Controller, FormProvider, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Container,
  FormLabel,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'

import AppHeader from '~components/AppHeader'

const NewPost = (): JSX.Element => {
  const formMethods = useForm()
  const { control, handleSubmit } = formMethods

  const onSubmit = (data: unknown) => {
    console.log(data)
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
                  name="painpoint"
                  control={control}
                  defaultValue=""
                  render={({ field: { value, onChange } }) => (
                    <FormLabel mr="0">
                      How would you describe your problem?
                      <Textarea
                        value={value}
                        onChange={onChange}
                        background="white"
                      />
                    </FormLabel>
                  )}
                />
                <Controller
                  name="tried"
                  control={control}
                  defaultValue=""
                  render={({ field: { value, onChange } }) => (
                    <FormLabel>
                      What are some ways you have tried to tackle this problem?
                      <Textarea
                        value={value}
                        onChange={onChange}
                        background="white"
                      />
                    </FormLabel>
                  )}
                />
                <Box>
                  <Button type="submit" colorScheme="primary">
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

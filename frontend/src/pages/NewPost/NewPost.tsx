import { Controller, FormProvider, useForm } from 'react-hook-form'
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'

import AppHeader from '~components/AppHeader'

const NewPost = (): JSX.Element => {
  const formMethods = useForm({ mode: 'onTouched' })
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = formMethods

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <AppHeader />
      <Container>
        <VStack align="start" py="30px">
          <Text>New Post</Text>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack align="start" spacing="10px">
                <Controller
                  name="painpoint"
                  control={control}
                  defaultValue=""
                  render={({ field: { value, onChange } }) => (
                    <FormLabel>
                      Pain Points
                      <Input
                        name="painpoint"
                        value={value}
                        onChange={onChange}
                      />
                    </FormLabel>
                  )}
                />
                <Button type="submit" colorScheme="primary">
                  Submit
                </Button>
              </VStack>
            </form>
          </FormProvider>
        </VStack>
      </Container>
    </>
  )
}

export default NewPost

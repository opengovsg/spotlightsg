import { Controller, FormProvider, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Container,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'

import AppHeader from '~components/AppHeader'

const NewPost = (): JSX.Element => {
  const formMethods = useForm({ mode: 'onTouched' })
  const { control, handleSubmit } = formMethods

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <AppHeader />
      <Container>
        <VStack align="stretch" py="30px">
          <Text textStyle="h4">Create a new post</Text>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack align="stretch" spacing="10px">
                <Controller
                  name="painpoint"
                  control={control}
                  defaultValue=""
                  render={({ field: { value, onChange } }) => (
                    <FormLabel>
                      Pain Point
                      <Textarea value={value} onChange={onChange} />
                    </FormLabel>
                  )}
                />
                <Controller
                  name="tried"
                  control={control}
                  defaultValue=""
                  render={({ field: { value, onChange } }) => (
                    <FormLabel>
                      What have you tried to tackle this problem?
                      <Textarea value={value} onChange={onChange} />
                    </FormLabel>
                  )}
                />
                <Controller
                  name="anon"
                  control={control}
                  defaultValue="anon"
                  render={({ field: { value, onChange } }) => (
                    <RadioGroup value={value} onChange={onChange}>
                      <HStack spacing="20px">
                        <Radio value="anon">Remain anonymous</Radio>
                        <Radio value="showname">Show name</Radio>
                      </HStack>
                    </RadioGroup>
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

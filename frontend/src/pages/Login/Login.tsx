import { useState } from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Image,
  Input,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'

import { useAuth } from '~/auth'
import {
  requestOtpByEmail,
  veryfyOtpByEmail as verifyOtpByEmail,
} from '~/services/SpotlightApi'

import security from '../../img/security.png'

// Login has 2 phases
const PHASES = {
  ENTER_EMAIL: 'enter_email',
  ENTER_OTP: 'enter_otp',
}

const Login: React.FC = () => {
  const toast = useToast()
  const { setAuth } = useAuth()
  const [phase, setPhase] = useState(PHASES.ENTER_EMAIL)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const onEmailSubmit = async () => {
    try {
      if (!email.endsWith('.gov.sg')) {
        throw Error('email must end in .gov.sg')
      }
      await requestOtpByEmail({ email })
      setPhase(PHASES.ENTER_OTP)
    } catch (error) {
      toast({
        title: String(error),
        status: 'error',
      })
    }
  }

  const onOtpSubmit = async () => {
    try {
      const auth = await verifyOtpByEmail({ email, token: otp })
      setAuth(auth.data)
    } catch (error) {
      toast({
        title: 'invalid OTP',
        status: 'error',
      })
    }
  }

  const emailForm = (
    <form
      onSubmit={(e) => {
        // Prevent default which reloads the page
        e.preventDefault()
        onEmailSubmit()
      }}
    >
      <VStack align="stretch">
        <Text textStyle="h5" color="primary.700">
          Verify that you are a public officer
        </Text>
        <Text textStyle="caption2" color="primary.500" pb="10px">
          Submissions made on this platform are completely anonymous with only
          your agency revealed. Your email is used solely to verify your public
          officer identity and is not tagged to your submissons.
        </Text>
        <label>
          <Text textStyle="subhead1">Email</Text>
          <Input
            required
            value={email}
            placeholder="e.g jane@data.gov.sg"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <Box>
          <Button colorScheme="primary" type="submit">
            Login
          </Button>
        </Box>
      </VStack>
    </form>
  )

  const otpForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onOtpSubmit()
      }}
    >
      <VStack align="stretch">
        <Box>
          <Button
            variant="link"
            colorScheme="primary"
            onClick={() => setPhase(PHASES.ENTER_EMAIL)}
          >
            <Text textStyle="caption2">
              <ArrowBackIcon />
              Back
            </Text>
          </Button>
        </Box>
        <label>
          <Text textStyle="h5" color="primary.700">
            Verify your OTP
          </Text>
          <Text textStyle="caption2" color="primary.500" pb="10px">
            Your OTP should have been sent to your inbox
          </Text>
          <Input
            value={otp}
            type="number"
            onChange={(event) => setOtp(event.target.value)}
          />
        </label>
        <Box>
          <Button colorScheme="primary" type="submit">
            Submit
          </Button>
        </Box>
      </VStack>
    </form>
  )

  return (
    <SimpleGrid columns={2} minH="100vh">
      <Center p="30px">
        <Image src={security} />
      </Center>
      <VStack align="stretch" p="30px" justify="center" background="white">
        {phase === PHASES.ENTER_EMAIL && emailForm}
        {phase === PHASES.ENTER_OTP && otpForm}
      </VStack>
    </SimpleGrid>
  )
}

export default Login

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Button, Center, Heading, Input, VStack } from '@chakra-ui/react'

import { useAuth } from '~/auth'
import {
  requestOtpByEmail,
  veryfyOtpByEmail as verifyOtpByEmail,
} from '~/services/SpotlightApi'

// Login has 2 phases
const PHASES = {
  ENTER_EMAIL: 'enter_email',
  ENTER_OTP: 'enter_otp',
}

const Login: React.FC = () => {
  const { setAuth } = useAuth()
  const [phase, setPhase] = useState(PHASES.ENTER_EMAIL)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const onEmailSubmit = async () => {
    try {
      await requestOtpByEmail({ email })
      setPhase(PHASES.ENTER_OTP)
    } catch (error) {
      //   toastError(error)
    }
  }

  const onOtpSubmit = async () => {
    try {
      const auth = await verifyOtpByEmail({ email, token: otp })
      setAuth(auth.data)
    } catch (error) {
      // TODO: Reconsider this part as the error message is already shown under the otp input box
    }
  }

  const emailForm = (
    <form
      onSubmit={(e) => {
        // Prevent default which reloads the page
        // Instead call the primary event
        e.preventDefault()
        onEmailSubmit()
      }}
    >
      <VStack align="start">
        <label>
          Enter your email
          <Input
            value={email}
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <Button colorScheme="primary" type="submit">
          Login
        </Button>
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
      <VStack align="start">
        <label>
          Enter your OTP
          <Input
            value={otp}
            type="number"
            onChange={(event) => setOtp(event.target.value)}
          />
        </label>
        <Button colorScheme="primary" type="submit">
          Submit
        </Button>
      </VStack>
    </form>
  )

  return (
    <Center minH="80vh">
      <VStack align="start">
        <Heading>Spotlight</Heading>
        {phase === PHASES.ENTER_EMAIL && emailForm}
        {phase === PHASES.ENTER_OTP && otpForm}
      </VStack>
    </Center>
  )
}

export default Login

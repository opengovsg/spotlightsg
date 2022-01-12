/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Button, Center, Input, VStack } from '@chakra-ui/react'

import {
  requestOtpByEmail,
  veryfyOtpByEmail as verifyOtpByEmail,
} from '~/services/SpotlightApi'

import { useAuth } from '~features/auth'

// Login has 2 phases
const PHASES = {
  ENTER_EMAIL: 'enter_email',
  ENTER_OTP: 'enter_otp',
}

const Login: React.FC = () => {
  const { setIsAuthenticated } = useAuth()
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
      await verifyOtpByEmail({ email, token: otp })
      setIsAuthenticated(true)
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
      <label>
        Enter your email
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <Button colorScheme="primary" type="submit">
        Login
      </Button>
    </form>
  )

  const otpForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onOtpSubmit()
      }}
    >
      <label>
        Enter your OTP
        <Input value={otp} onChange={(event) => setOtp(event.target.value)} />
      </label>
      <Button colorScheme="primary" type="submit">
        Submit
      </Button>
    </form>
  )

  return (
    <Center>
      <VStack align="start">
        {phase === PHASES.ENTER_EMAIL && emailForm}
        {phase === PHASES.ENTER_OTP && otpForm}
      </VStack>
    </Center>
  )
}

export default Login

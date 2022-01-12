/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Button, Center, Input, VStack } from '@chakra-ui/react'

import { requestOtpByEmail } from '~/services/SpotlightApi'

// Login has 2 phases
const PHASES = {
  ENTER_EMAIL: 'enter_email',
  ENTER_OTP: 'enter_otp',
}

const Login: React.FC<Record<string, never>> = () => {
  const [phase, setPhase] = useState(PHASES.ENTER_EMAIL)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const onEmailSubmit = async () => {
    try {
      //   await requestOtpByEmail({ email })
      requestOtpByEmail({ email })
      const aaa = await setPhase(PHASES.ENTER_OTP)
      console.log(aaa)
    } catch (error) {
      //   toastError(error)
    }
  }

  const onOtpSubmit = async () => {
    try {
      //   const credentials = await verifyOtpAndEmailForCredentials({ otp, email })
      //   setAuthStateWithUser({ ...credentials.user, token: credentials.token })
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
        <Input />
      </label>
      <Button colorScheme="primary">Login</Button>
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
        <Input />
      </label>
      <Button colorScheme="primary">Submit</Button>
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

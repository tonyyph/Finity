import {tw} from '@/utils'
import {useEffect, useState} from 'react'
import {Touch} from '../ui/touch'
import {Typography} from './text-typography'

export function ResendVerificationDowntime() {
  const [timeLeft, setTimeLeft] = useState(30) // 30s

  useEffect(() => {
    if (timeLeft <= 0) return
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timeLeft])

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')

  const resendVerificationCode = () => {
    setTimeLeft(30)
  }

  if (timeLeft === 0) {
    return (
      <Touch onPress={resendVerificationCode}>
        <Typography type="bs" weight="medium" textColor="#FF885D" style={tw`text-center mt-8 border-b self-center border-[#FF885D]`}>
          Resend verification code
        </Typography>
      </Touch>
    )
  }

  return (
    <Typography type="bs" weight="medium" textColor={timeLeft > 0 ? '#737373' : '#FF885D'} className={tw`text-center mt-8`}>
      {timeLeft > 0 && `Resend code in ${minutes}:${seconds}`}
    </Typography>
  )
}

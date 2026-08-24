"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { loginAction } from '../_actions/authAction'


const LoginForm = () => {
  return (
    <form action={loginAction} className='space-y-3'>
        <Card className='p-10 space-y-3'>
            <Input name='email' type='email' placeholder='Type you email' required />
            <Input name='password' type='password' placeholder='Enter Your Password' required/>
            <Button type='submit'  >Login</Button>
        </Card>
    </form>
  )
}

export default LoginForm 
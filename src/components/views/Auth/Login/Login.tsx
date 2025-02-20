import { Button, Card, CardBody, Input, Spinner } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import useLogin from './useLogin'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Controller } from 'react-hook-form'
import { cn } from '@/utils/cn'

const Login = () => {
    const {isVisible, toggleVisibility, control, handleLogin, handleSubmit, isPendingLogin, errors} = useLogin()
  return (
    <div className='flex w-full items-center justify-center gap-10 lg:gap-20 lg:flex-row flex-col'>
        <div className='flex w-full lg:w-1/3 flex-col items-center justify-center gap-10'>
            <Image src="/images/general/logo.svg" alt='Logo' width={180} height={180}/>
            <Image src="/images/illustrations/login.svg" className='w-2/3 lg:w-full' alt='Login' width={1024} height={1024}/>
        </div>
        <div>
            <Card>
                <CardBody className='p-8'>
                    <h2 className='text-2xl font-bold text-danger-500'>Login</h2>
                    <p className='text-small mt-2 mb-4'>Don{"'"}t have an account?&nbsp;
                        <Link href="/auth/register" className='font-semibold tewt-danger-400'>Register here</Link>
                    </p>
                    {errors.root && (
                        <p className='mb-2 text-medium text-danger'>{errors?.root?.message}</p>
                    )}
                    {/* Setelah mengsubmit, handlenya akan menjalankan handleLogin */}
                    <form className={cn("flex w-80 flex-col", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")}onSubmit={handleSubmit(handleLogin)}>
                        <Controller name='identifier' control={control} render={({field}) => (
                            <Input {...field} type='text' label="Username / Email" variant='bordered' autoComplete='off' isInvalid={errors.identifier !== undefined} errorMessage={errors.identifier?.message}/>
                        )}/>
                        <Controller name='password' control={control} render={({field}) => (
                            <Input {...field} type={isVisible ? "text" : "password"} label="Password" variant='bordered' autoComplete='off' endContent={
                                <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <FaEye className='text-xl text-default-400 pointer-events-none'/>
                                    ) : (<FaEyeSlash className='text-xl text-default-400 pointer-events-none'/>)
                                    }
                                </button>
                            } isInvalid={errors.password !== undefined} errorMessage={errors.password?.message}/>
                        )}/>
                    
                        
                        <Button color='danger' size='lg' type='submit'>{isPendingLogin ? (<Spinner color='white' size='sm'/>) : ("Login")}</Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    </div>
  )
}

export default Login
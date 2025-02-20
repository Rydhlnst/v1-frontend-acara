import { Button, Card, CardBody, Input, Spinner } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import useRegister from './useRegister'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Controller } from 'react-hook-form'
import { cn } from '@/utils/cn'

const Register = () => {
    const {visiblePassword, handleVisiblePassword, control, handleRegister, handleSubmit, isPendingRegister, errors} = useRegister()
  return (
    <div className='flex w-full items-center justify-center gap-10 lg:gap-20 lg:flex-row flex-col'>
        <div className='flex w-full lg:w-1/3 flex-col items-center justify-center gap-10'>
            <Image src="/images/general/logo.svg" alt='Logo' width={180} height={180}/>
            <Image src="/images/illustrations/login.svg" className='w-2/3 lg:w-full' alt='Login' width={1024} height={1024}/>
        </div>
        <div>
            <Card>
                <CardBody className='p-8'>
                    <h2 className='text-2xl font-bold text-danger-500'>Create Account</h2>
                    <p className='text-small mt-2 mb-4'>Have an account?&nbsp;
                        <Link href="/login" className='font-semibold tewt-danger-400'>Login here</Link>
                    </p>
                    {errors.root && (
                        <p className='mb-2 text-medium text-danger'>{errors?.root?.message}</p>
                    )}
                    {/* Setelah mengsubmit, handlenya akan menjalankan handleRegister */}
                    <form className={cn("flex w-80 flex-col", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")}onSubmit={handleSubmit(handleRegister)}>
                        <Controller name='fullName' control={control} render={({field}) => (
                            <Input {...field} type='text' label="Fullname" variant='bordered' autoComplete='off' isInvalid={errors.fullName !== undefined} errorMessage={errors.fullName?.message}/>
                        )}/>
                        <Controller name='userName' control={control} render={({field}) => (
                            <Input {...field} type='text' label="Username" variant='bordered' autoComplete='off' isInvalid={errors.userName !== undefined} errorMessage={errors.userName?.message}/>
                        )}/>
                        <Controller name='email' control={control} render={({field}) => (
                            <Input {...field} type='email' label="Email" variant='bordered' autoComplete='off' isInvalid={errors.email !== undefined} errorMessage={errors.email?.message}/>
                        )}/>
                        <Controller name='password' control={control} render={({field}) => (
                            <Input {...field} type={visiblePassword.password ? "text" : "password"} label="Password" variant='bordered' autoComplete='off' endContent={
                                <button className='focus:outline-none' type='button' onClick={() => handleVisiblePassword("password")}>
                                    {visiblePassword.password ? (
                                        <FaEye className='text-xl text-default-400 pointer-events-none'/>
                                    ) : (<FaEyeSlash className='text-xl text-default-400 pointer-events-none'/>)
                                    }
                                </button>
                            } isInvalid={errors.password !== undefined} errorMessage={errors.password?.message}/>
                        )}/>
                        <Controller name='confirmPassword' control={control} render={({field}) => (
                            <Input {...field} type={visiblePassword.passwordConfirmation ? "text" : "password"} label="Reenter Password" variant='bordered' autoComplete='off' endContent={
                                <button className='focus:outline-none' type='button' onClick={() => handleVisiblePassword("passwordConfirmation")}>
                                    {visiblePassword.passwordConfirmation ? (
                                        <FaEye className='text-xl text-default-400 pointer-events-none'/>
                                    ) : (<FaEyeSlash className='text-xl text-default-400 pointer-events-none'/>)
                                    }
                                </button>
                            } isInvalid={errors.confirmPassword !== undefined} errorMessage={errors.confirmPassword?.message}/>
                        )}/>
                        
                        
                        
                        <Button color='danger' size='lg' type='submit'>{isPendingRegister ? (<Spinner color='white' size='sm'/>) : ("Register")}</Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    </div>
  )
}

export default Register
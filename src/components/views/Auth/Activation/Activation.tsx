import Image from 'next/image'
import React from 'react'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'

interface propTypes {
    status: "success" | "failed"
}

const Activation = (props: propTypes) => {
    const router = useRouter();
    const {status} = props;
  return (
    <div className='flex w-screen flex-col items-center justify-center gap-10 p-4'>
        <div className='flex flex-col items-center justify-center gap-10'>
            <Image src="/images/general/logo.svg" alt='logo' width={180} height={180}/>
            <Image src={status === "success" ? "/images/illustrations/success.svg" : "/images/illustrations/pending.svg"} alt='success' width={300} height={300}/>
        </div>
        <div className='flex flex-col items-center gap-2 text-center'>
            <h1 className='text-3xl font-bold text-danger-300'>
                {status === "success" ? "Activation Success" : "Activation Failed"}
            </h1>
            <p className='text-xl font-bold text-default-500'>
                {status === "success" ? "Thank you for register in Acara" : "Confirmation code is invalid"}
            </p>
            <Button className='mt-4 w-fit' variant='bordered' color='danger' onClick={() => router.push('/')}>Back to Home</Button>
        </div>
    </div>
  )
}

export default Activation
import Toaster from '@/components/ui/Toaster';
import { defaultToaster, ToasterContext } from '@/context/ToasterContext';
import { cn } from '@/utils/cn';
import { Inter } from 'next/font/google';
import React, { ReactNode, useContext, useEffect } from 'react'

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
  })

interface PropTypes {
    children: ReactNode
}

const AppShell = (props: PropTypes) => {
    const {children} = props;
    const {toaster, setToaster} = useContext(ToasterContext);

    useEffect(() => {
        // Membuat toaster gaada setelah 3 detik
        const timeout = setTimeout(() => {
            setToaster(defaultToaster)
        }, 3000);
        return() => {
            clearTimeout(timeout)
        }
    }, [])

  return (
    <main className={cn(inter.className)}>
        {children}
        {toaster.type !== "" && <Toaster type={toaster.type} message={toaster.message}/>}
    </main>
  )
}

export default AppShell
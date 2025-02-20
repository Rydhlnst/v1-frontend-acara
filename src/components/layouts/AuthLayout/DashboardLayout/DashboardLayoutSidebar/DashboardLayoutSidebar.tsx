import { cn } from '@/utils/cn';
import { Button, Listbox, ListboxItem } from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import { CiLogout } from 'react-icons/ci';

interface SidebarItem {
    key: string,
    label: string,
    href: string,
    icon: JSX.Element;
}

interface PropTypes {
    // Kumpulan sidebaritem
    sidebarItems: SidebarItem[];
    isOpen: boolean
}

const DashboardLayoutSidebar = (props: PropTypes) => {
    const router = useRouter()
    const {sidebarItems, isOpen} = props;
  return (
    <div className={cn("fixed lg:relative z-50 flex h-screen w-full -translate-x-full max-w-[300px] lg:translate-x-0 flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all", {"translate-x-0": isOpen})}>
        <div className='flex flex-col w-full items-center justify-center'>
            <div>
                <Image src="/images/general/logo.svg" alt='logo' width={180} height={60} className='mb-6 w-32' onClick={() => router.push("/")}/>
            </div>
            <Listbox items={sidebarItems} variant='solid' aria-label='Dashboard Menu'>
                {(item) => (
                    <ListboxItem key={item.key} className={cn("my-1 h12 text-2xl", {
                        // Jika hrefnya dimulai dengan nama itemnya maka akan diberi bg danger 500
                        "bg-danger-500 text-white": router.pathname.startsWith(item.href),
                    })} startContent={item.icon} textValue={item.label} aria-labelledby={item.label} aria-describedby={item.label}>
                        <p className='text-small'>{item.label}</p>
                    </ListboxItem>
                )}
            </Listbox>
        </div>
        <div className='flex items-center p-1'>
            <Button color='danger' fullWidth variant='light' className='flex justify-start rounded-lg px-2 py-1.5' size='lg' onClick={() => signOut()}>
                <CiLogout/>
                Logout
            </Button>
        </div>
    </div>
  )
}

export default DashboardLayoutSidebar
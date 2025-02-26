
import DataTable from '@/components/ui/DataTable'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, Key, ReactNode } from 'react'
import { CiMenuKebab } from 'react-icons/ci';
import { COLUMN_LISTS_CATEGORY } from './Category.constant';
import LIMIT_LISTS from '@/constants/list.constants';

const Category = () => {
  const {push} = useRouter();
  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch(columnKey) {
        case "icon": return (
          <Image src={`${cellValue}`} alt='icon' width={100} height={200}/>
        );
        case "actions": return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size='sm' variant='light'>
                <CiMenuKebab className='text-default-700'/>
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem onPress={() => push(`/admin/category/${category._id}`)} key="detail-category">Detail Category</DropdownItem>
              <DropdownItem className='text-danger-500' key="delete-category">Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
        default: return cellValue as ReactNode;
      }
    }, [push]
  )
  return (
    <section>
      <DataTable columns={COLUMN_LISTS_CATEGORY} currentPage={1} onChangePages={() => {}} totalPages={2} data={[
        {
          _id: "123",
          name: "Category 1",
          description: "Description 1",
          icon: "/images/general/logo.png"
        }
      ]} limit={LIMIT_LISTS[0].label} onChangeLimit={() => {}} onChangeSearch={() => {}} onClearSearch={() => {}} buttonTopContent='Create Category' onClickButtonTopContent={() => {}} renderCell = {renderCell} emptyContent="Category is Empty"/>
    </section>
  )
}

export default Category
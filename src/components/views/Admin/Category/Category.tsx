
import DataTable from '@/components/ui/DataTable'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, Key, ReactNode, useEffect } from 'react'
import { CiMenuKebab } from 'react-icons/ci';
import { COLUMN_LISTS_CATEGORY } from './Category.constant';
import { LIMIT_LISTS } from '@/constants/list.constants';
import useCategory from './useCategory';
import InputFile from '@/components/ui/InputFile';
import AddCategoryModal from './AddCategoryModal';

const Category = () => {
  const {push, isReady, query} = useRouter();
  const {setURL, dataCategory, isLoadingCategory, currentLimit, currentPage, isRefetchingCategory, handleChangeLimit, handleChangePage, handleClearSearch, handleSearch, refetchCategory} = useCategory();

  const addCategoryModal = useDisclosure();

  // Mengecek isReady??
  useEffect(() => {
    if(isReady) {
      setURL();
    }
  }, [isReady])

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch(columnKey) {
        // case "icon": return (
        //   <Image src={`${cellValue}`} alt='icon' width={100} height={200}/>
        // );
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
      {Object.keys(query).length > 0 && (
        <DataTable isLoading={isLoadingCategory || isRefetchingCategory} columns={COLUMN_LISTS_CATEGORY} currentPage={Number(currentPage)} onChangePages={handleChangePage} totalPages={dataCategory?.pagination.totalPages} data={dataCategory?.data || []} limit={String(currentLimit)} onChangeLimit={handleChangeLimit} onChangeSearch={handleSearch} onClearSearch={handleClearSearch} buttonTopContent='Create Category' onClickButtonTopContent={addCategoryModal.onOpen} renderCell = {renderCell} emptyContent="Category is Empty"/>
      )}
      <AddCategoryModal {...addCategoryModal} refetchCategory={refetchCategory}/>
    </section>

  )
}

export default Category
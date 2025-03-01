import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea } from '@nextui-org/react'
import React from 'react'
import useAddCategoryModal from './useAddCategory.modal';
import { Controller } from 'react-hook-form';
import InputFile from '@/components/ui/InputFile';
import useMediaHandling from '@/hooks/useMediaHandling';

interface PropTypes {
    isOpen: boolean,
    onClose: () => void;
    refetchCategory: () => void;
    onOpenChange: () => void
}



const AddCategoryModal = (props: PropTypes) => {
    

    const {isOpen, onClose, refetchCategory, onOpenChange} = props;
    const {
        control, errors, reset, handleSubmitForm, handleAddCategory, isPendingMutateAddCategory, isSuccessMutateAddCategory, handleUploadIcon, preview,isPendingMutateUploadFile, 
    } = useAddCategoryModal()
  return (
    <Modal onOpenChange={onOpenChange} isOpen={isOpen} placement='center' scrollBehavior='inside'>
        <form onSubmit={handleSubmitForm(handleAddCategory)}>
            <ModalContent className='mt-4'>
                <ModalHeader>Add Category</ModalHeader>
                <ModalBody>
                    <div className='flex flex-col gap-4'>
                        <p className='text-sm font-bold'>Information</p>
                        <Controller name='name' control={control} render={({field}) => (
                            <Input {...field} autoFocus label="Name" variant='bordered' type='text' isInvalid={errors.name !== undefined} errorMessage={errors.name?.message}/>
                        )}/>
                        <Controller name='description' control={control} render={({field}) => (
                            <Textarea {...field} label="Description" variant='bordered' isInvalid={errors.description !== undefined} errorMessage={errors.description?.message}/>
                        )}/>
                        <p className='text-sm font-bold'>Icon</p>
                        <Controller name='icon' control={control} render={({field: {onChange, value, ...field}}) => (
                            <InputFile {...field} onUpload={(files) => handleUploadIcon(files, onChange)} isUploading={isPendingMutateUploadFile} isInvalid={errors.icon !== undefined} errorMessage={errors.icon?.message} isDropable preview={typeof preview === "string" ? preview: ""}/>
                        )}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant='flat' onPress={onClose} disabled={isPendingMutateAddCategory || isPendingMutateUploadFile}>
                        Cancel
                    </Button>
                    <Button color="danger" type='submit' disabled={isPendingMutateAddCategory || isPendingMutateAddCategory}>
                        {isPendingMutateUploadFile || isPendingMutateAddCategory ? (
                            <Spinner/>
                        ): (
                            "Create Category"
                        )}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </form>
    </Modal>
  )
}

export default AddCategoryModal
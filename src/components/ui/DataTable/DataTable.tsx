import LIMIT_LISTS from '@/constants/list.constants';
import { cn } from '@/utils/cn';
import { button, Button, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { ChangeEvent, Key, ReactNode, use, useMemo } from 'react'
import { CiSearch } from 'react-icons/ci';

interface PropTypes {
    totalPages: number;
    onChangePages: (page: number) => void;
    onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
    limit: string;
    isLoading?: boolean;
    emptyContent: string;
    currentPage: number;
    buttonTopContent?: string;
    onClickButtonTopContent?: () => void;
    columns: Record<string, unknown>[];
    data: Record<string, unknown>[];
    onClearSearch: () => void;
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
}

const DataTable = (props: PropTypes) => {
    const {buttonTopContent, columns, data, limit, isLoading, renderCell, onClearSearch, onChangeLimit, onChangeSearch, onClickButtonTopContent, totalPages, onChangePages, currentPage, emptyContent } = props;
    const topContent = useMemo(() => {
        return (
            <div className='flex flex-col-reverse items-start justify-between gap-y-4 lg:items-center lg:flex-row '>
                <Input isClearable className='w-full sm:max-w-[24%]' placeholder='Search by name' startContent={<CiSearch/>} onClear={onClearSearch} onChange={onChangeSearch}/>
                {buttonTopContent && (
                    <Button color='danger' onPress={onClickButtonTopContent}>

                    </Button>
                )}
            </div>
        )
    }, [buttonTopContent, onChangeSearch, onClickButtonTopContent, onClearSearch]);

    const BottomContent = useMemo(() => {
        return (
            <div className='flex items-center justify-center lg:justify-between px-2 py-2'>
                <Select size='md' selectedKeys={[limit]} selectionMode='single' onChange={onChangeLimit} className='hidden max-w-36 lg:block' startContent={
                    <p className='text-small'>Show:</p>
                }>
                    {LIMIT_LISTS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>
                <Pagination isCompact showControls color='danger' page={currentPage} total={totalPages} onChange={onChangePages}/>
            </div>
        )
    }, [limit, currentPage, totalPages, onChangeLimit, onChangePages])

  return (
    <Table topContent={topContent} topContentPlacement='outside'  bottomContent={BottomContent} bottomContentPlacement='outside' classNames={{
        base: "max-w-full",
        wrapper: cn({"overflow-x-hidden": isLoading})
    }}>
        <TableHeader columns={columns}>
            {(column) => (
                <TableColumn key={column.uid as Key}>
                    {column.name as string}
                </TableColumn>
            )}
        </TableHeader>

        <TableBody items={data} emptyContent={emptyContent} isLoading={isLoading} loadingContent={
            <div className='flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm'>
                <Spinner color='danger'/>
            </div>
        }>
            {(item) => (
                <TableRow key={item._id as Key}>
                    {(columnKey) => (
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                </TableRow>
            )}
        </TableBody>
    </Table>
  )
}

export default DataTable
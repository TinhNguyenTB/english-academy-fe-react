import { Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from '@/libs/axiosInstance'

interface PageResponse<T> {
  content: T[]
  totalElements: number
}

interface Props<T extends { id: number }> {
  columns: ColumnsType<T>
  endpoint: string
  filters?: Record<string, any>
  rowActions?: (record: T) => React.ReactNode
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  paginationPosition?:
    | 'bottomCenter'
    | 'bottomLeft'
    | 'bottomRight'
    | 'none'
    | 'topCenter'
    | 'topLeft'
    | 'topRight'
  showTotal?: (total: number, range: [number, number]) => string
}

export function DateTable<T extends { id: number }>({
  columns,
  endpoint,
  filters = {},
  rowActions,
  showSizeChanger = false,
  showQuickJumper = false,
  paginationPosition = 'bottomCenter',
  showTotal
}: Props<T>) {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10
  })
  const [sortField, setSortField] = useState('id')
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | null>(null)

  const { data, isFetching } = useQuery({
    queryKey: [endpoint, pagination.current, pagination.pageSize, sortField, sortOrder, filters],
    queryFn: async () => {
      const res = await axios.get<PageResponse<T>>(endpoint, {
        params: {
          page: pagination.current! - 1,
          size: pagination.pageSize,
          sortBy: sortField,
          direction: sortOrder === 'ascend' ? 'asc' : 'desc',
          ...filters
        }
      })
      return res.data
    }
  })

  const handleTableChange = (pagination: TablePaginationConfig, _: any, sorter: any) => {
    setPagination(pagination)
    if (sorter?.field) {
      setSortField(sorter.field)
      setSortOrder(sorter.order)
    }
  }

  const mergedColumns = [
    ...columns.map((col) => {
      if ('dataIndex' in col && typeof col.dataIndex === 'string') {
        return {
          ...col,
          filteredValue: filters[col.dataIndex] || null
        }
      }
      return col
    }),
    ...(rowActions
      ? [
          {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: T) => rowActions(record)
          }
        ]
      : [])
  ]

  return (
    <Table
      scroll={{ x: 'max-content' }}
      rowKey='id'
      columns={mergedColumns || []}
      dataSource={data?.content || []}
      loading={isFetching}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: data?.totalElements,
        showSizeChanger: showSizeChanger,
        showQuickJumper: showQuickJumper,
        pageSizeOptions: ['5', '10', '20', '50'],
        position: [paginationPosition],
        showTotal
      }}
      onChange={handleTableChange}
    />
  )
}

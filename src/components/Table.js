import { Button } from '@mui/material'
import { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import EditModal from './EditModal'

function Table({ articles, 
  countries, 
  categories, 
  updateArticlesList,
  transformArticleData
}) {

  const articleData = useMemo(() => articles, [articles])

  const columnNames = [
    {
      Header: '',
      accessor: 'id'
    },
    {
      Header: 'Title',
      accessor: 'title'
    },
    {
      Header: 'Published',
      accessor: 'published'
    }, {
      Header: 'Link',
      accessor: 'link'
    }, {
      Header: 'Added',
      accessor: 'created_at'
    },
    {
      Header: 'Last Updated',
      accessor: 'updated_at'
    },
    {
      Header: 'Category',
      accessor: 'category'
    },
    {
      Header: 'Country',
      accessor: 'country'
    }
  ]
  const articleColumns = useMemo(
    () => articleData[0] ? columnNames : [], [articleData]
  )
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <EditModal 
          articleInfo={row.values}
          countries={countries}
          categories={categories}
          updateArticlesList={updateArticlesList}
          transformArticleData={transformArticleData}/>
          // <Button onClick={() => console.log("editing row", row.values)}>
          //   Edit
          // </Button>
          )
      },
      {
        id: "Delete",
        Header: "Delete",
        Cell: ({ row }) => (
          <Button onClick={() => deleteArticle(row.values.id)}>
            Delete
          </Button>
          )
      },
        ...columns,
    ])
}
const tableInstance = useTable({ 
  columns: articleColumns, 
  data: articleData }, tableHooks,
  usePagination)

const { getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  state,
  prepareRow
} = tableInstance

if (articles === {}) {
  return (<>No Articles</>)
}

function deleteArticle(id) {
  console.log('id', id)
  fetch(`http://localhost:9292/article/${id}`, {
    method: 'DELETE',
  })
  .then( r => r.json())
  .then( deletedArticle => console.log(deletedArticle))
}

return (

  <>
    <h1 className="text-xl font-semibold">Articles used by Paralegals</h1><div className="mt-5 flex flex-col">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                {page.map(row => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <td {...cell.getCellProps()} className="px-2 py-4 whitespace-nowrap max-w-md truncate">
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {' << '}
              </button>{' '}
              <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'  <  '}
              </button>{' '}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'  >  '}
              </button>{' '}
              <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {' >> '}
              </button>{' '}
              <span>
                Page{' '}
                <strong>
                  {state.pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
              </span>
              <select
                value={state.pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[5, 10, 20].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)
}

export default Table
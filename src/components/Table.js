import { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'

function Table({ articles }) {

  const articleData = useMemo(() => articles, [articles])
  console.log('1st 5 ', articleData.slice(0,5))
  const articleColumns = useMemo(
    () =>
      articleData[0] ?
        Object.keys(articleData[0])
          .map(key => {
            return {
              Header: key,
              accessor: key
            }
          }) :
        []
    , [articleData])

  const tableInstance = useTable({ columns: articleColumns, data: articleData }, usePagination)

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

  return (

    <div className="mt-5 flex flex-col">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            < table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()} >
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
                    <tr {...row.getRowProps()} >
                      {row.cells.map(cell => {
                        return (
                          <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap max-w-md truncate">
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
  )
}

export default Table
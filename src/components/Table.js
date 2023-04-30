import { useMemo } from 'react'
import { useTable } from 'react-table'

function Table({ articles }) {

  const articleData = useMemo(() => articles, [articles])
  // console.log('1st 5 memoized', articleData)
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

  const tableInstance = useTable({ columns: articleColumns, data: articleData })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

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
                      <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
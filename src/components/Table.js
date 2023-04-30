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
    < table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            { headerGroup.headers.map(column => (
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
                        { cell.render('Cell')}
                      </td>
                    )
                  })}
              </tr>
            )
          })}
      </tbody>
    </table>

  )
}

export default Table
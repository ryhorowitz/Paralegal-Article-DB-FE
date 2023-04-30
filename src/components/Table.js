import { useMemo } from 'react'
import { useTable } from 'react-table'

function Table({ articles }) {

  // const firstFiveArticles = articles.slice(0,5)
  // console.log('1st 5', firstFiveArticles)

  const data = useMemo(() => articles, [articles])
  // const tableInstance = useTable({  })
  console.log('1st 5 memoized', data)

  const columns = useMemo(
    () => 
      articles[0] ?
        Object.keys(articles)
          .map(key => {
            return {
              Header: key,
              Accessor: key
            }
          }) :
        []
    , [articles])

  const tableInstance = useTable({ columns, data })

  const { getTableProps, getTableBodyProps, headerGroups, rows, preparedRow } = tableInstance

  return (
    <></>
    //   <Table {...getTableProps()}>

    // </Table>
  )
}

export default Table
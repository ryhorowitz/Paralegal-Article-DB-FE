import EditModal from './EditModal'
import * as React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'


// const tableRows = articles.map(article => {
//   return (
//     <tr key={article.id}>
//       <td>{article.title}</td>
//       <td>{article.published}</td>
//       <td>{article.link}</td>
//       <td>{article.created_at}</td>
//       <td>{article.updated_at}</td>
//       <td>
//         <EditModal
//           article={article}
//           countries={countries}
//           onUpdateArticle={onUpdateArticle} />

//       </td>
//       <td><Button onClick={() => handleDeleteArticle(article.id)}>Delete</Button></td>
//     </tr>
//   )
// })
function createData(title, published, link, added, updated, edit, deleteButton) {
  return { title, published, link, added, updated, edit, deleteButton };
}



// [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// function BasicTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
function ArticleTable({ articles, onDeleteArticle, onUpdateArticle, countries }) {

  // const tableRows = articles.map(article => {
  //   return (
  //     <tr key={article.id}>
  //       <td>{article.title}</td>
  //       <td>{article.published}</td>
  //       <td>{article.link}</td>
  //       <td>{article.created_at}</td>
  //       <td>{article.updated_at}</td>
  //       <td>
  //         <EditModal
  //           article={article}
  //           countries={countries}
  //           onUpdateArticle={onUpdateArticle} />

  //       </td>
  //       <td><Button onClick={() => handleDeleteArticle(article.id)}>Delete</Button></td>
  //     </tr>
  //   )
  // })
  const rows = articles.map(article => {
    return createData(article.title,
      article.published,
      article.link,
      article.created_at,
      article.updated_at
      // <EditModal
      //   article={article}
      //   countries={countries}
      //   onUpdateArticle={onUpdateArticle} />,
      // <Button onClick={() => handleDeleteArticle(article.id)}>Delete</Button>
    )
  })
  function handleDeleteArticle(id) {
    fetch(`http://localhost:9292/article/${id}`, {
      method: 'DELETE',
    })
      .then(r => r.json())
      .then(article => onDeleteArticle(article))
  }
  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Published</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {console.log('row data is', row)}
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.published}</TableCell>
              <TableCell align="right">{row.link}</TableCell>
              <TableCell align="right">{row.added}</TableCell>
              <TableCell align="right">{row.updated}</TableCell>
              {/* <TableCell align="right">{row.updated}</TableCell> */}
              {/* <TableCell align="right">{row.created}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

}

export default ArticleTable
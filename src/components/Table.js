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
import { css } from '@emotion/react'

function createData(title, published, link, added, updated, edit, deleteButton) {
  return { title, published, link, added, updated, edit, deleteButton };
}

function ArticleTable({ articles, onDeleteArticle, onUpdateArticle, countries }) {

  const rows = articles.map(article => {
    return createData(article.title,
      article.published,
      article.link,
      article.created_at,
      article.updated_at,
      <EditModal
        article={article}
        countries={countries}
        onUpdateArticle={onUpdateArticle} />,
      <Button onClick={() => handleDeleteArticle(article.id)}>Delete</Button>
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

    <TableContainer component={Paper}
      css={css` width: '100%'`}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: 250 }}>Title</TableCell>
            <TableCell sx={{ maxWidth: 50 }} align="right">Published</TableCell>
            <TableCell sx={{ width: 850 }} align="right">Link</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Updated</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
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
              <TableCell align="right">{row.edit}</TableCell>
              <TableCell align="right">{row.deleteButton}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

}

export default ArticleTable
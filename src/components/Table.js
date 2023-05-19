import { Button } from '@mui/material'
import EditModal from './EditModal'

function Table({ articles, onDeleteArticle, onUpdateArticle, countries }) {

  const tableRows = articles.map(article => {
    return (
      <tr key={article.id}>
        <td>{article.title}</td>
        <td>{article.published}</td>
        <td>{article.link}</td>
        <td>{article.created_at}</td>
        <td>{article.updated_at}</td>
        <td>
          <EditModal
            article={article}
            countries={countries} 
            onUpdateArticle={onUpdateArticle}/>
          
        </td>
        <td><Button onClick={() => handleDeleteArticle(article.id)}>Delete</Button></td>
      </tr>
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
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Published</th>
            <th>Link</th>
            <th>Added</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </>
  )

}

export default Table
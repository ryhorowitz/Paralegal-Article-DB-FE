import { useState } from "react";
import Table from './Table'


function Countries({ countries, onDeleteArticle, onUpdateArticle }) {
  const [articles, setArticles] = useState([])

  function handleClick(clickedCountry) {
    const country = countries.find(country => country.name === clickedCountry)
    setArticles(country.articles)
  }

  const countryListItems = countries.map(country => {
    return (
      <li
        onClick={() => handleClick(country.name)}
        key={country.id}>
        {country.name}
      </li>
    )
  })

  return (
    <>
      <h2>List of Countries</h2>
      <br></br>
      <ul>
        {countryListItems}
      </ul>
      <Table
        articles={articles}
        onDeleteArticle={onDeleteArticle} 
        onUpdateArticle={onUpdateArticle}
        countries={countries}/>
    </>
  )
}

export default Countries
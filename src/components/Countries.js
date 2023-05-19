import { useEffect, useState } from "react";
import Table from './Table'


function Countries({ countries, onDeleteArticle, onUpdateArticle }) {
  const [articles, setArticles] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  // onClick
  // set country

  useEffect( () => {
    if (selectedCountry !== '') {
    const country = countries.find(country => country.name === selectedCountry)
    setArticles(country.articles)
    }
  }, [countries, selectedCountry])

  function handleClick(clickedCountry) {
    const country = countries.find(country => country.name === clickedCountry)
    setSelectedCountry(country.name)
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
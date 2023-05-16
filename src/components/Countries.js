import { useState } from "react";
import Table from './Table'


function Countries ({  countries}) {
  const [articles, setArticles] = useState([])

  function handleClick(clickedCountry) {
    const country = countries.find( country => country.name === clickedCountry)
    console.log('country is', country)
    setArticles(country.articles)
  }
  const countriesList = countries.map( country => {
    return <li 
    onClick={() => handleClick(country.name)} 
    key={country.id}
    >{country.name}</li>
  })

  return (
<>
      <h2>List of Countries</h2>
      <br></br>
      <ul>
        {countriesList}
      </ul>
      <Table articles={articles}/>
    </>
  )
}

export default Countries
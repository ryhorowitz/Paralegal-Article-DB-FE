import { useState } from "react";
import Table from './Table'
import CategorySelector from "./CategorySelector";
import CountrySelector from "./CountrySelector";

function Articles({ articles, 
  categories, 
  countries, 
  updateArticlesList,
  transformArticleData
}) {
  const [selectedCategoryName, setSelectedCategoryName] = useState('All')
  const [selectedCountryName, setSelectedCountryName] = useState('All')
  const [selectedCountryObject, setSelectedCountryObject] = useState({})
  const [selectedCategoryObject, setSelectedCategoryObject] = useState({})

  function onCategorySelectionChange(selection) {
    setSelectedCategoryName(selection)
    if (selection === 'All') {
      setSelectedCategoryObject({})
    } else {
      console.log('im here')
      let categoryObj = categories.find(category => category.name === selection)
      setSelectedCategoryObject(categoryObj)
    }
  }
  function onCountrySelectionChange(selection) {
    setSelectedCountryName(selection)
    if (selection === 'All') {
      setSelectedCountryObject({})
    } else {
      let countryObj = countries.find(country => country.name === selection)
      setSelectedCountryObject(countryObj)
    }
  }

  let displayArticles = []

  if (selectedCategoryName === 'All' && selectedCountryName === 'All') {
    displayArticles = articles
  } else if (selectedCountryName === 'All' && selectedCategoryName !== 'All') {
    displayArticles = categories.find(cat => cat.name === selectedCategoryName).articles
  } else if (selectedCategoryName === 'All' && selectedCountryName !== 'All') {
    displayArticles = countries.find(country => country.name === selectedCountryName).articles
  } else {
    // console.log('Im in the else block')
    fetch(`http://localhost:9292/articles/country/category?country_id=${selectedCountryObject.id}&category_id=${selectedCategoryObject.id}`)
      .then(r => r.json())
      .then(data => {
        console.log('fetch data is', data)
        // not working as expected but stopped troubleshooting this to get to MVP
        displayArticles = data
      })
  }
  // console.log('displayArts', displayArticles)

  return (
    <>
      <CountrySelector
        countries={countries}
        onSelectionChange={onCountrySelectionChange} />
      <CategorySelector
        categories={categories}
        onSelectionChange={onCategorySelectionChange} />
      <Table
        articles={displayArticles}
        countries={countries}
        categories={categories} 
        updateArticlesList={updateArticlesList}
        transformArticleData={transformArticleData}/>
    </>
  )
}

export default Articles
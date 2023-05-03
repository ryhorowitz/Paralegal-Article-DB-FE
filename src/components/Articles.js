import { useState } from "react";
import Table from './Table'
import CategorySelector from "./CategorySelector";
import CountrySelector from "./CountrySelector";

function Articles({ articles, categories, countries }) {
  const [selectedCategoryName, setSelectedCategoryName] = useState('All')
  //start with a null state. 
  //add logic to make null 'All' for displayArticles
  const [selectedCountryName, setSelectedCountryName] = useState('All')
  //save the object not just name of the country

  const [selectedCountryObject, setSelectedCountryObject] = useState({})

  function onCategorySelectionChange(selection) {
    setSelectedCategoryName(selection)
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

  let displayArticles

  if (selectedCategoryName === 'All' && selectedCountryName === 'All') {
    displayArticles = articles
  } else if (selectedCountryName === 'All' && selectedCategoryName !== 'All') {
    displayArticles = categories.find(cat => cat.name === selectedCategoryName).articles
  } else if (selectedCategoryName === 'All' && selectedCountryName !== 'All') {
    displayArticles = countries.find(country => country.name === selectedCountryName).articles
  } else { //specific country and category
    //filter by country
    //then find which articles by country also have the category
    let countryObj = countries.find(country => country.name === selectedCountryName)
    // console.log('countryObj', countryObj)
    displayArticles = countryObj

    fetch(`http://localhost:9292/articles?country_id=${selectedCountryObject.id}&category_id=${selectedCategoryName}`)
      .then(r => r.json())
      .then(data => console.log('data is', data))
  }
  // console.log('displayArts', displayArticles)


  // if selectedCategory and selectedCountry === all
  // return articles
  // if selected Category = all and selectedCountry != all
  // countries.find(country => country.name === selectedCountry).articles
  // if selectdCountry = all and selected Category != all
  // categories.find(cat => cat.name === selectedCategory).articles
  // else
  // countries.find(country => country.name === selectedCountry).articles
  return (
    <>
      <CountrySelector
        countries={countries}
        onSelectionChange={onCountrySelectionChange} />
      <CategorySelector
        categories={categories}
        onSelectionChange={onCategorySelectionChange} />
      <Table articles={displayArticles} />
    </>
  )
}

export default Articles
import { useState } from "react";
import Table from './Table'
import CategorySelector from "./CategorySelector";
import CountrySelector from "./CountrySelector";

function Articles({ articles, categories, countries }) {
  //category selects a category and changes what articles are set to the Table
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState('All')
  //function that grabs what cat is selected and then filters articles to pass down to Table
  function onCategorySelectionChange(selection) {
    setSelectedCategory(selection)
  }

  function onCountrySelectionChange(selection) {
    setSelectedCountry(selection)
  }
  const displayArticles = selectedCategory === 'All' ?
    articles
    :
    categories.find(cat => cat.name === selectedCategory).articles
  console.log('displayArts', displayArticles)

  return (
    <>
      <CountrySelector 
      countries={countries} 
      onSelectionChange={onCountrySelectionChange}/>
      <CategorySelector 
      categories={categories} 
      onSelectionChange={onCategorySelectionChange} />
      <Table articles={displayArticles} />
    </>
  )
}

export default Articles
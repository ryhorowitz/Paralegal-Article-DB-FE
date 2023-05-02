import { useState } from "react";
import Table from './Table'
import CategorySelector from "./CategorySelector";

function Articles({ articles, categories }) {
  //category selects a category and changes what articles are set to the Table
  const [selectedCategory, setSelectedCategory] = useState('All')

  //function that grabs what cat is selected and then filters articles to pass down to Table
  function onSelectionChange(selection) {
    setSelectedCategory(selection)
  }
  const displayArticles = selectedCategory === 'All' ?
    articles
    :
    categories.find(cat => cat.name === selectedCategory).articles
  console.log('displayArts', displayArticles)

  
  //find the categories.find( cat => cat.name === selected category)
  return (
    <>
      {/* add drop down menu to select by category and country */}
      <CategorySelector categories={categories} onSelectionChange={onSelectionChange} />
      <Table articles={displayArticles} />
    </>
  )
}

export default Articles
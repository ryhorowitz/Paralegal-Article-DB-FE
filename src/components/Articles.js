import { useState } from "react";
import Table from './Table'
import CategorySelector from "./CategorySelector";

function Articles({ articles, categories }) {

  return (
    <>
      {/* add drop down menu to select by category and country */}
      <CategorySelector categories={categories} />
      <Table articles={articles} />
    </>
  )
}

export default Articles
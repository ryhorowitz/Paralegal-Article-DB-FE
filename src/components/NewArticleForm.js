import { useState } from "react"

function NewArticleForm() {
  const [form, setForm] = useState({
    title: '',
    published: '',
    link: '',
    category: '', //make selector
    country: '' //make seletor
  })
  return (
  <>
  <form>
    <input type="text" placeholder="title"></input>
    <input type="text" placeholder="published"></input>
    <input type="text" placeholder="link"></input>
  </form>
  </>
  )
}

export default NewArticleForm
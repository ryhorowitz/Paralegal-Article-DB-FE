import { useState } from "react"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import {
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  MenuItem
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import AddCountryModal from "./AddCountryModal"

function NewArticleForm({
  categories,
  countries,
  updateArticlesList,
  transformArticleData,
  updateCountriesList
}) {
  const [date, setDate] = useState(dayjs('2022-04-17'))
  const [form, setForm] = useState({
    title: '',
    link: '',
    category: '',
    country: ''
  })
  const navigate = useNavigate()
  const countriesList = countries.map(country => {
    return (
      <MenuItem key={country.id} value={country.name}>
        {country.name}
      </MenuItem>
    )
  })

  const categoriesList = categories.map(category => {
    return (
      <MenuItem key={category.id} value={category.name}>
        {category.name}
      </MenuItem>
    )
  })
  function handleChange(e) {
    let name = e.target.name
    let value = e.target.value

    setForm({
      ...form,
      [name]: value
    })
  }

  function findId(string, prop) {
    const obj = prop.find(cat => cat.name === string)
    return obj.id
  }

  function handleSubmit(e) {
    e.preventDefault()
    const body = {
      ...form,
      published: date
    }

    body.country_id = findId(form.country, countries)
    body.category_id = findId(form.category, categories)
    delete body.country
    delete body.category

    console.log('body is ', body)
    fetch(`http://localhost:9292/new_article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(articles => {
        console.log('res is', articles)
        transformArticleData(articles)
        updateArticlesList(articles)
      })
    navigate('/articles')
  }
  return (
    <>
      <Box m={5}>
        <Typography mb={2} align="center" variant="h2">
          Add Article Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} width={600}  >
            <TextField
              label="Title"
              name="title"
              onChange={handleChange}>
            </TextField>
            <DatePicker
              label="Date Published"
              name="published"
              value={date}
              onChange={(newDate) => setDate(newDate)} />
            <TextField
              label="Link"
              name="link"
              onChange={handleChange}>
            </TextField>
            <TextField
              select
              label="Select Category"
              name="category"
              onChange={handleChange}
              value={form.category}>
              {categoriesList}
            </TextField>
            <TextField
              select
              label="Select Country"
              name="country"
              onChange={handleChange}
              value={form.country}>
              {countriesList}
              <AddCountryModal updateCountriesList={updateCountriesList} />
            </TextField>
            <Button type="submit" variant="contained" color="primary">
              Add Article
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  )
}

export default NewArticleForm
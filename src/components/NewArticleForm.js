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
  transformArticleData
 }) {
  const [date, setDate] = useState(dayjs('2022-04-17'))
  const [form, setForm] = useState({
    title: '',
    link: '',
    category: '',
    country: ''
  })
  const navigate = useNavigate()

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
    // alert('you have submited the form', form)
    console.log('new article form', form)
    //make a post req that adds to db.
    console.log('date is', date)

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
      .then(data => {
        console.log('res is', data)
      })
      .then( () => {
        fetch(`http://localhost:9292/`)
        .then(r => r.json())
        .then(data => {
          console.log('fetch get after post', data)
          transformArticleData(data)
          updateArticlesList(data)
        })
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
              <MenuItem value="Sexual Violence">Sexual Violence</MenuItem>
              <MenuItem value="Human Rights">Human Rights</MenuItem>
              <MenuItem value="Religious Persecution">Religious Persecution</MenuItem>
              <MenuItem value="General Report">General Report</MenuItem>
              <MenuItem value="Political Violence">Political Violence</MenuItem>
              <MenuItem value="Corruption">Corruption</MenuItem>
              <MenuItem value="Gang Violence">Gang Violence</MenuItem>
            </TextField>
            <TextField
              select
              label="Select Country"
              name="country"
              onChange={handleChange}
              value={form.country}>
              <MenuItem value="Brazil">Brazil</MenuItem>
              <MenuItem value="El Salvador">El Salvador</MenuItem>
              <MenuItem value="Congo">Congo</MenuItem>
              <MenuItem value="Ecuador">Ecuador</MenuItem>
              <MenuItem value="Guatemala">Guatemala</MenuItem>
              <MenuItem value="Honduras">Honduras</MenuItem>
              <MenuItem value="Jamaica">Jamaica</MenuItem>
              <MenuItem value="Liberia">Liberia</MenuItem>
              <MenuItem value="Pakistan">Pakistan</MenuItem>
              <MenuItem value="Venezuela">Venezuela</MenuItem>
              <AddCountryModal />
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
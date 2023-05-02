import { useState } from "react"
import { TextField, Button, Stack, Box, Typography, MenuItem } from "@mui/material"

function NewArticleForm() {
  const [form, setForm] = useState({
  })

  function handleChange(e) {
    let name = e.target.name
    let value = e.target.value
    // console.log('name is', name)
    setForm({
      ...form,
      [name]: value
    })
  }
  function handleSubmit(e) {
    e.preventDefault()
    alert('you have submited the form', form)
  }
  return (
    <>
      <Box m={5}>
        <Typography mb={2} align="center" variant="h2">
          Add Article Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} width={600}  >
            <TextField label="Title"
              name="title"
              onChange={handleChange}>
            </TextField>
            <TextField label="Published"
              name="published"
              onChange={handleChange}>
            </TextField>
            <TextField label="Link"
              name="link"
              onChange={handleChange}>
            </TextField>
            <TextField select
              label="Select Category"
              name="category"
              onChange={handleChange}>
              {/* need to dynamically add children */}
              <MenuItem value="Sexual Violence">Sexual Violence</MenuItem>
              <MenuItem value="Human Rights">Human Rights</MenuItem>
              <MenuItem value="Religious Persecution">Religious Persecution</MenuItem>
              <MenuItem value="General Report">General Report</MenuItem>
              <MenuItem value="Political Violence">Political Violence</MenuItem>
              <MenuItem value="Corruption">Corruption</MenuItem>
              <MenuItem value="Gang Violence">Gang Violence</MenuItem>
            </TextField>
            <TextField select
              label="Select Country"
              name="country"
              onChange={handleChange}>
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
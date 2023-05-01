import { useState } from "react"
import { TextField, Button, Stack, Box, Typography, MenuItem } from "@mui/material"

function NewArticleForm() {
  const [form, setForm] = useState({
  })

  function handleChange(e) {
    let name = e.target.name
    let value = e.target.value
    console.log('name is', name)
    setForm({
      ...form,
      [name]: value 
    })
  }
  return (
    <>
      <Box m={5}>
        <Typography mb={2} align="center" variant="h2">
          Add Article Form
        </Typography>
        <form >
          <Stack spacing={2} width={600}  >
            <TextField label="Title" name="title" onChange={handleChange}></TextField>
            <TextField label="Published" name="published" onChange={handleChange}></TextField>
            <TextField label="Link" name="link" onChange={handleChange}></TextField>
            <TextField select label="Select Category" name="category">
              {/* need to dynamically add children */}
            </TextField>
            <TextField select label="Select Country" name="country"></TextField>
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
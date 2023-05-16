import React, { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers"
import {
  Button,
  Modal,
  Typography,
  Box,
  MenuItem,
  TextField,
  Stack
} from "@mui/material";

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function EditModal({ article, countries }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dayjs(article.published))
  const [form, setForm] = useState({
    title: article.title,
    link: article.link,
    country: article.country
  })
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const countriesList = countries.map(country => {
    return (
      <MenuItem key={country.id} value={country.name}>
        {country.name}
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
    console.log('edit article form', form)
    const body = {
      ...form,
      published: date
    }

    body.country_id = findId(form.country, countries)
    delete body.country

    console.log('body is ', body)
    fetch(`http://localhost:9292/article/${article.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(articles => {
        console.log(articles)
      })
  }
  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={boxStyle}>
          <Typography id="edit-modal-title" variant="h6" component="h2">
            Edit Article
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} fullwidth="true"  >
              <TextField
                label="Title"
                name="title"
                value={form.title}
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
                value={form.link}
                onChange={handleChange}>
              </TextField>
              <TextField
                select
                label="Select Country"
                name="country"
                onChange={handleChange}
                value={form.country}>
                {countriesList}
              </TextField>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default EditModal;

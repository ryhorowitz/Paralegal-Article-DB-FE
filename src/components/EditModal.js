import React, { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers"
import { Button, 
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

function EditModal({ countries, categories}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dayjs('2022-04-17'))
  const [form, setForm] = useState({
    title: '',
    link: '',
    category: '',
    country: ''
  })
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
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
    body.category_id = findId(form.category, categories)
    delete body.country
    delete body.category

    console.log('body is ', body)
    fetch(`http://localhost:9292/new_article`, {
      method: "PATCH",
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
          // transformArticleData(data)
          // updateArticlesList(data)
        })
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
              onChange={handleChange}>
            </TextField>
            <DatePicker //https://mui.com/x/react-date-pickers/date-picker/
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

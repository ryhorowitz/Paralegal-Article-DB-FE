import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack
} from '@mui/material'


const style = {
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

export default function AddCountryModal({ updateCountries }) {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState('')
  const handleOpen = () => setOpen(true);

  function handleClose() {
    setCountry('')
    setOpen(false)
  }
  function handleAddNewCountry(e) {
    fetch('http://localhost:9292/country', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: country })
    })
      .then(r => r.json())
      .then(newCountry => {
        // country to be added to list
        console.log('New country is', newCountry)
        updateCountries(newCountry)
      })
    handleClose()
  }

  return (
    <div>
      <Button onClick={handleOpen}> Add New Country to List</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter the Country Below
          </Typography>
          <Stack>
            <TextField
              label="Country Name"
              value={country}
              onChange={(e) => setCountry(e.target.value)}></TextField>
          </Stack>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            autoFocus
            onClick={handleAddNewCountry}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
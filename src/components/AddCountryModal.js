import {useState} from 'react';
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

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Add Country to List</Button>
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
            onChange={(e) => setCountry(e.target.value)}></TextField>
          </Stack>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            autofocus
            onClick={() => setOpen(false)}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
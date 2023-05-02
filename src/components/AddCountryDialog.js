import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { useState } from 'react'

function AddCountry() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}>Add New Country</Button>
      <Dialog
      open={open}
      onClose={() => setOpen(false)}>
        
        <DialogTitle>Please Enter New Country</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Blah blah
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            autofocus
            onClick={() => setOpen(false)}>Submit</Button>
        </DialogActions >
      </Dialog >
    </>
  )
}

export default AddCountry
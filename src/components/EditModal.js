import React, { useState } from "react";
import { Button, Modal, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const ExampleModal = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Paper className={classes.paper}>
          <h2>Edit Article</h2>
          <p>Modal content goes here...</p>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close Modal
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};

export default ExampleModal;
// In this example, we're using the useState hook to keep track of the state of the modal, and the makeStyles hook to create a custom style for the modal. We're also using the Button, Modal, and Paper components from Material UI to create the modal and its content.

// When the "Open Modal" button is clicked, the handleOpen function is called, which sets the open state to true and causes the modal to appear on the screen. When the "Close Modal" button is clicked or the user clicks outside of the modal, the handleClose function is called, which sets the open state to false and causes the modal to disappear.







/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { getDatabase, onValue, ref, set, push } from "firebase/database";
import { RecordsModel } from "../types/Models";
import FolderList from "./FolderList";
import database from "../utils/firebase";

import { Category } from "../types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "80%",
};

interface FormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  appointments: number[];
  categories: Category[];
}

interface SubjectModalProps {
  openModal: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpenModal: (open: boolean) => void;
  records: RecordsModel;
  appointments: number[];
  categories: Category[];
  setRecords: React.Dispatch<React.SetStateAction<RecordsModel>>;
  setAppointments: React.Dispatch<React.SetStateAction<number[]>>;
}

function FormDialog({
  open,
  setOpen,
  appointments,
  categories,
}: FormDialogProps) {
  const [name, setName] = React.useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const categoriesRef = ref(database, "categories");
    set(categoriesRef, [
      ...categories,
      {
        name,
        appointments,
      },
    ]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Set Category Name</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Category Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Add Category</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function SubjectModal({
  openModal,
  setOpenModal,
  records,
  appointments,
  categories,
  setRecords,
  setAppointments,
}: SubjectModalProps) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <FormDialog
        open={openDialog}
        setOpen={setOpenDialog}
        appointments={appointments}
        categories={categories}
      />
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Typography
              variant="h6"
              id="modal-modal-title"
              sx={{
                marginTop: "1em",
                marginBottom: "1rem",
                marginLeft: "30px",
                fontWeight: "bold",
                fontFamily: "montserrat",
              }}
            >
              Select Subjects
            </Typography>
            <Button
              sx={{
                marginTop: "1em",
                marginBottom: "1rem",
                marginLeft: "auto",
                marginRight: "30px",
                fontWeight: "bold",
                fontFamily: "montserrat",
                fontSize: "16px",
              }}
              variant="text"
              onClick={() => setOpenDialog(true)}
            >
              Save as Category
            </Button>
          </Grid>
          <FolderList
            records={records}
            appointments={appointments}
            setRecords={setRecords}
            setAppointments={setAppointments}
          />
        </Box>
      </Modal>
    </>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { RecordsModel } from "../types/Models";

import FolderList from "./FolderList";

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

interface SubjectModalProps {
  openModal: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpenModal: (open: boolean) => void;
  records: RecordsModel;
  appointments: number[];
  setRecords: React.Dispatch<React.SetStateAction<RecordsModel>>;
  setAppointments: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function SubjectModal({
  openModal,
  setOpenModal,
  records,
  appointments,
  setRecords,
  setAppointments,
}: SubjectModalProps) {
  const handleClose = () => setOpenModal(false);

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          variant="h6"
          id="modal-modal-title"
          sx={{
            margin: "10px",
          }}
        >
          Select Subjects
        </Typography>
        <FolderList
          records={records}
          appointments={appointments}
          setRecords={setRecords}
          setAppointments={setAppointments}
        />
      </Box>
    </Modal>
  );
}

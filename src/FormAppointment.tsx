/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-globals */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
// @ts-nocheck
import React, { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  SelectChangeEvent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { resourcesData } from "../demo-data/resources";

import { AppointmentRecord, RecordsModel } from "./Models";
import ColorSelector from "./ColorSelector";
import TimePicker from "./TimePicker";

type AppointmentRecordField =
  | "title"
  | "stubCode"
  | "start"
  | "end"
  | "colorId";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const mt10 = { marginTop: "10px" };

interface FormAppointmentProps {
  open: boolean;
  close: () => void;
  appointmentId?: number;
  records: RecordsModel;
  onSubmit: (records: RecordsModel) => void;
}

export default function FormAppointment({
  open,
  close,
  appointmentId,
  records,
  onSubmit,
}: FormAppointmentProps) {
  const [fetchedData, setFechedData] = useState(false);

  const emptyAppointment: AppointmentRecord = {
    title: "",
    stubCode: "",
    days: ["1"],
    start: "",
    end: "",
    id: 0,
    colorId: "",
  };

  const [appointmentRecord, setAppointmentRecord] = useState(emptyAppointment);

  if (!fetchedData && open && appointmentId && appointmentId > 0) {
    setAppointmentRecord(records[appointmentId]);
    setFechedData(true);
  }

  const handleChange =
    (field: AppointmentRecordField) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setAppointmentRecord({
        ...appointmentRecord,
        [field]: event.target.value,
      });
    };

  const handleSelectDay = (
    event: React.MouseEvent,
    newSelectedDays: string[],
  ) => {
    if (newSelectedDays.length) {
      setAppointmentRecord({ ...appointmentRecord, days: newSelectedDays });
    }
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    setAppointmentRecord({ ...appointmentRecord, colorId: event.target.value });
  };

  function handleClose() {
    if (
      JSON.stringify(appointmentRecord) !== JSON.stringify(emptyAppointment)
    ) {
      if (
        (appointmentId &&
          JSON.stringify(appointmentRecord) ===
            JSON.stringify(records[appointmentId])) ||
        confirm("WARNING!: Your selection will be discarded!")
      ) {
        setAppointmentRecord(emptyAppointment);
        close();
        setFechedData(false);
      }
    } else {
      close();
    }
  }

  function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (appointmentId) {
      onSubmit({
        ...records,
        [appointmentId]: { ...appointmentRecord, id: appointmentId },
      });
    } else {
      const key = Math.max(...Object.keys(records).map(Number)) + 1;
      onSubmit({ ...records, [key]: { ...appointmentRecord, id: key } });
    }
    setAppointmentRecord(emptyAppointment);
    close();
    setFechedData(false);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handelSubmit}>
          <Typography variant="h6" component="h2">
            Details
          </Typography>
          <div style={mt10}>
            <TextField
              label="Title"
              value={appointmentRecord.title}
              style={{ width: "100%" }}
              name="title"
              onChange={handleChange("title")}
              required
            />
          </div>
          <div style={mt10}>
            <TextField
              label="Stub Code"
              value={appointmentRecord.stubCode}
              style={{ width: "100%" }}
              onChange={handleChange("stubCode")}
              name="stubCode"
              required
            />
          </div>
          <div style={mt10}>
            <ToggleButtonGroup
              value={appointmentRecord.days}
              onChange={handleSelectDay}
              aria-label="weekDay"
            >
              <ToggleButton value="1" aria-label="mon">
                Mon
              </ToggleButton>
              <ToggleButton value="2" aria-label="tues">
                Tue
              </ToggleButton>
              <ToggleButton value="3" aria-label="wed">
                Wed
              </ToggleButton>
              <ToggleButton value="4" aria-label="thu">
                Thu
              </ToggleButton>
              <ToggleButton value="5" aria-label="fri">
                Fri
              </ToggleButton>
              <ToggleButton value="6" aria-label="sat">
                Sat
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div
            style={{
              paddingTop: "10px",
            }}
          >
            <TimePicker
              startValue={appointmentRecord.start}
              startOnChange={handleChange("start")}
              endValue={appointmentRecord.end}
              endOnChange={handleChange("end")}
            />
          </div>
          <div style={mt10}>
            <ColorSelector
              value={appointmentRecord.colorId?.toString()}
              onChange={handleColorChange}
              colors={resourcesData}
            />
          </div>
          <div style={{ marginTop: "40px" }}>
            <div style={{ marginRight: "10px", display: "inline-block" }}>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </div>
            <div style={{ display: "inline-block" }}>
              <Button
                variant="contained"
                type="button"
                color="error"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

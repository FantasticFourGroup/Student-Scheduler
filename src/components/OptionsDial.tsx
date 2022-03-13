import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ClassIcon from "@mui/icons-material/Class";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import CategoryIcon from "@mui/icons-material/Category";

import { ref, set } from "firebase/database";
import database from "../utils/firebase";

import { appointmentsRecords } from "../../demo-data/appointment_record";

interface OptionsDialProps {
  clickCourse: () => void;
  // eslint-disable-next-line no-unused-vars
  clickSubject: (open: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  clickRemove: (open: boolean) => void;
}

export default function OptionsDial({
  clickCourse,
  clickSubject,
  clickRemove,
}: OptionsDialProps) {
  const handleSubjectClick = () => clickSubject(true);
  const handleRemove = () => clickRemove(true);
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        key="course"
        icon={<EventNoteIcon />}
        tooltipTitle="Create Course Schedule"
        onClick={clickCourse}
      />
      <SpeedDialAction
        key="class"
        icon={<ClassIcon />}
        tooltipTitle="Select Classes"
        onClick={handleSubjectClick}
      />
      <SpeedDialAction
        key="remove"
        icon={<HighlightOffIcon />}
        tooltipTitle="Remove Schedule"
        onClick={handleRemove}
      />
      <SpeedDialAction
        key="category"
        icon={<CategoryIcon />}
        tooltipTitle="Add Category"
      />
      {!import.meta.env.PROD ? (
        <SpeedDialAction
          key="data"
          icon={<DataSaverOnIcon />}
          tooltipTitle="Add Demo Data"
          onClick={() => {
            const currentScheduleRef = ref(database, "currentSchedule");
            const appointmentsRef = ref(database, "appointments");

            set(appointmentsRef, appointmentsRecords);
            set(currentScheduleRef, [1]);
          }}
        />
      ) : null}
    </SpeedDial>
  );
}

import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ClassIcon from "@mui/icons-material/Class";

interface OptionsDialProps {
  clickCourse: () => void;
  // eslint-disable-next-line no-unused-vars
  clickSubject: (open: boolean) => void;
}

export default function OptionsDial({
  clickCourse,
  clickSubject,
}: OptionsDialProps) {
  const handleSubjectClick = () => clickSubject(true);
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
    </SpeedDial>
  );
}
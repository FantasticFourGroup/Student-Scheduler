import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";

import { ref, set } from "firebase/database";
import { RecordsModel } from "../types/Models";
import database from "../utils/firebase";

interface FolderListProps {
  records: RecordsModel;
  appointments: number[];
}

interface ItemProps {
  id: number;
  primary: string;
  avatar: React.ReactElement;
  secondary: string;
  checked: boolean;
}

export default function FolderList({ records, appointments }: FolderListProps) {
  const [allRecords, setAllRecords] = React.useState([] as ItemProps[]);
  const [selectedAppointments, setSelectedAppointments] = React.useState(
    [] as number[],
  );

  React.useEffect(() => {
    const computed = Object.values(records).map((record) => ({
      id: record.id,
      primary: record.title,
      avatar: <ImageIcon />,
      secondary: record.stubCode,
      checked: appointments.includes(record.id),
    }));
    setAllRecords(computed);
    setSelectedAppointments(appointments);
  }, [appointments, records]);

  React.useEffect(() => {
    const currentScheduleRef = ref(database, "currentSchedule");
    set(currentScheduleRef, selectedAppointments);
  }, [selectedAppointments]);

  const handleCheckboxChange = (id: number) => {
    const newRecords = allRecords.map((record) => {
      if (record.id === id) {
        return { ...record, checked: !record.checked };
      }
      return record;
    });
    const newSelectedAppointments = allRecords
      .map((record) => (record.checked ? record.id : 0))
      .filter((item) => item !== 0);
    setAllRecords(newRecords);
    setSelectedAppointments(newSelectedAppointments);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "100%",
        bgcolor: "background.paper",
        height: "80%",
        overflow: "auto",
      }}
    >
      {allRecords.map((item) => (
        <ListItem key={item.id}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>{item.avatar}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.primary} secondary={item.secondary} />
            <Checkbox
              checked={item.checked}
              onChange={() => handleCheckboxChange(item.id)}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

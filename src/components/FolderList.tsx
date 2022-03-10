import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";

import { RecordsModel } from "../types/Models";

interface FolderListProps {
  records: RecordsModel;
  appointments: number[];
  setRecords: React.Dispatch<React.SetStateAction<RecordsModel>>;
  setAppointments: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function FolderList({
  records,
  appointments,
  setRecords,
  setAppointments,
}: FolderListProps) {
  const handleCheckboxChange = (id: number) => {
    const newRecords = {
      ...records,
      [id]: {
        ...records[id],
        checked: !records[id].checked,
      },
    };
    const newSelectedAppointments: number[] = Object.keys(newRecords)
      .map(Number)
      .map((key) => (newRecords[key].checked ? Number(key) : 0))
      .filter((val) => val !== 0);
    setRecords(newRecords);
    setAppointments(newSelectedAppointments);
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
      {Object.values(records).map((item) => (
        <ListItem key={item.id}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.title} secondary={item.stubCode} />
            <Checkbox
              checked={!!appointments.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

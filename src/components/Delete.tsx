/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";

// eslint-disable-next-line object-curly-newline
import { Box, Button, Modal, Typography } from "@mui/material";
import { RecordsModel } from "../types/Models";
import DaySelector from "./DaySelector";

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

interface RemoveRecordProps {
  records: RecordsModel;
  setRecords: React.Dispatch<React.SetStateAction<RecordsModel>>;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  open: boolean;
  onClose: () => void;
}

export default function RemoveRecord({
  records,
  setRecords,
  open,
  onClose,
  selected,
  setSelected,
}: RemoveRecordProps) {
  const handleOnClick = (id: number) => () => {
    const newSelected = selected.filter((item) => item !== id);
    const newRecordId = Object.keys(records).filter(
      (recordsId) => Number(recordsId) !== id,
    );
    setSelected(newSelected);
    setRecords(
      newRecordId.reduce(
        (previous, recordId) => ({
          ...previous,
          [recordId]: records[Number(recordId)],
        }),
        {},
      ),
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
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
                <Typography style={{ color: "gray", marginRight: "20px" }}>
                  {item.start} -{item.end}
                </Typography>
                <DaySelector value={item.days} onChange={() => {}} disabled />
                <Button onClick={handleOnClick(item.id)}>Delete</Button>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
}

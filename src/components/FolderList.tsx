import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

export default function FolderList() {
  const items = [
    {
      primary: "Photos",
      avatar: <ImageIcon />,
      secondary: "Jan 9, 2014",
    },
    {
      primary: "Recipes",
      avatar: <WorkIcon />,
      secondary: "Jan 17, 2014",
    },
    {
      primary: "Work",
      avatar: <BeachAccessIcon />,
      secondary: "Jan 28, 2014",
    },
    {
      primary: "Photos",
      avatar: <ImageIcon />,
      secondary: "Jan 9, 2014",
    },
    {
      primary: "Recipes",
      avatar: <WorkIcon />,
      secondary: "Jan 17, 2014",
    },
    {
      primary: "Work",
      avatar: <BeachAccessIcon />,
      secondary: "Jan 28, 2014",
    },
    {
      primary: "Photos",
      avatar: <ImageIcon />,
      secondary: "Jan 9, 2014",
    },
    {
      primary: "Recipes",
      avatar: <WorkIcon />,
      secondary: "Jan 17, 2014",
    },
    {
      primary: "Work",
      avatar: <BeachAccessIcon />,
      secondary: "Jan 28, 2014",
    },
    {
      primary: "Photos",
      avatar: <ImageIcon />,
      secondary: "Jan 9, 2014",
    },
    {
      primary: "Recipes",
      avatar: <WorkIcon />,
      secondary: "Jan 17, 2014",
    },
    {
      primary: "Work",
      avatar: <BeachAccessIcon />,
      secondary: "Jan 28, 2014",
    },
    {
      primary: "Photos",
      avatar: <ImageIcon />,
      secondary: "Jan 9, 2014",
    },
    {
      primary: "Recipes",
      avatar: <WorkIcon />,
      secondary: "Jan 17, 2014",
    },
    {
      primary: "Work",
      avatar: <BeachAccessIcon />,
      secondary: "Jan 28, 2014",
    },
  ];
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
      {items.map((item) => (
        <ListItem key={item.primary}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>{item.avatar}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.primary} secondary={item.secondary} />
            <Checkbox />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

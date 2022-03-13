/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";

import { set, ref } from "firebase/database";
import { Category } from "../types";

import database from "../utils/firebase";

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

interface CategoryModalProps {
  openModal: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpenModal: (open: boolean) => void;
  appointments: number[];
  categories: Category[];
  setAppointments: React.Dispatch<React.SetStateAction<number[]>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function CategoryModal({
  openModal,
  setOpenModal,
  appointments,
  categories,
  setAppointments,
  setCategories,
}: CategoryModalProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    const appointmentsRef = ref(database, "currentSchedule");
    const categoryAppointments = categories[index].appointments;
    setAppointments(categoryAppointments);
    set(appointmentsRef, categoryAppointments);
    setSelectedIndex(index);
  };
  const deleteCategory = (index: number) => () => {
    const categoriesRef = ref(database, "categories");
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
    set(categoriesRef, newCategories);
  };
  const handleClose = () => setOpenModal(false);

  return (
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
            Categories
          </Typography>
        </Grid>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <List
            sx={{
              marginX: "20px",
            }}
            component="nav"
            aria-label="main mailbox folders"
          >
            {categories.map((category, index) => (
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemIcon>
                  {selectedIndex === index ? (
                    <StarIcon className="starBorderOutlined" />
                  ) : (
                    <StarIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={category.name} />
                <ListItemIcon>
                  <DeleteIcon
                    sx={{
                      marginTop: "1em",
                      marginBottom: "1rem",
                      marginLeft: "auto",
                      marginRight: "30px",
                    }}
                    onClick={deleteCategory(index)}
                  />
                </ListItemIcon>
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Box>
    </Modal>
  );
}

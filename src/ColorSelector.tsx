import React from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Brightness1 from "@mui/icons-material/Brightness1";

interface ColorSelectorProps {
  value?: string;
  onChange: (event: SelectChangeEvent) => void;
  colors: ColorModel[];
}

interface ColorModel {
  text: string;
  id: number;
  color: string;
}

const ColorSelector = ({ value, onChange, colors }: ColorSelectorProps) => {
  const menuItem = colors.map((color) => (
    <MenuItem value={color.id} key={color.id}>
      <Brightness1 style={{ color: color.color }} />
      {color.text}
    </MenuItem>
  ));

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id="label">Color</InputLabel>

      <Select labelId="label" value={value} label="Color" onChange={onChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {menuItem}
      </Select>
    </FormControl>
  );
};

export default ColorSelector;

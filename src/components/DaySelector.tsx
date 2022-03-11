/* eslint-disable react/require-default-props */
import React from "react";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface DaySelectorProps {
  value: string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.MouseEvent, newSelectedDays: string[]) => void;
  disabled?: boolean;
}

export default function DaySelector({
  value,
  onChange,
  disabled,
}: DaySelectorProps) {
  return (
    <ToggleButtonGroup
      disabled={disabled ?? false}
      value={value}
      onChange={onChange}
      aria-label="weekDay"
    >
      <ToggleButton value="0" aria-label="sun">
        Sun
      </ToggleButton>
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
  );
}

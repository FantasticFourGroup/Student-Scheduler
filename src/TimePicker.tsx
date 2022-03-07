import React, { ChangeEvent, useState } from "react";

interface TimePickerProps {
  startValue: string;
  startOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  endValue: string;
  endOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const timeInputStyle = {
  borderStyle: "solid",
  borderColor: "lightGray",
  borderWidth: 1,
  borderRadius: 5,
  fontSize: "130%",
  padding: "12px",
};

const TimePicker = ({
  startValue,
  startOnChange,
  endValue,
  endOnChange,
}: TimePickerProps) => {
  const [endMin, setEndMin] = useState("06:00");

  function handleStartOnChange(e: ChangeEvent<HTMLInputElement>) {
    setEndMin(e.currentTarget.value);
    startOnChange(e);
  }

  return (
    <div>
      <div style={{ display: "inline-block" }}>
        <input
          style={timeInputStyle}
          name="start"
          type="time"
          value={startValue}
          min="06:00"
          max="00:00"
          onChange={handleStartOnChange}
          required
        />
      </div>
      <div
        style={{
          display: "inline-block",
          marginLeft: "15px",
          marginRight: "15px",
          fontSize: "120%",
        }}
      >
        -
      </div>
      <div style={{ display: "inline-block" }}>
        <input
          style={timeInputStyle}
          name="end"
          type="time"
          min={endMin}
          max="00:00"
          value={endValue}
          onChange={endOnChange}
          required
        />
      </div>
    </div>
  );
};

export default TimePicker;

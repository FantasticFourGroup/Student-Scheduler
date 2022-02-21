// @ts-nocheck
import React, { useState, useCallback, Fragment } from "react";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  DragDropProvider,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";

import {
  appointmentsMale,
  appointmentsFemale,
} from "../demo-data/appointments";

import { resourcesData } from "../demo-data/resources";
import { OptionProps } from "./types";

const PREFIX = "Demo";
// #FOLD_BLOCK
export const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
  formControlLabel: `${PREFIX}-formControlLabel`,
};
// #FOLD_BLOCK

const currentDate = "2018-06-27";
const options: OptionProps = {
  allowAdding: true,
  allowDeleting: true,
  allowUpdating: true,
  allowDragging: true,
  allowResizing: true,
};

const resources = [
  {
    fieldName: "colorId",
    title: "Color",
    instances: resourcesData,
  },
];

type SchedType = "maleSched" | "femaleSched";

export default () => {
  const [data, setData] = useState(appointmentsMale);
  const [editingOptions] = useState<OptionProps>(options);
  const [addedAppointment, setAddedAppointment] = useState({});

  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] =
    useState(false);

  const [sched, setSched] = useState("maleSched");

  function changeSched() {
    if (sched === "maleSched") {
      setData(appointmentsFemale);
      setSched("femaleSched");
    } else {
      setData(appointmentsMale);
      setSched("maleSched");
    }
  }

  const {
    allowAdding,
    allowDeleting,
    allowUpdating,
    allowResizing,
    allowDragging,
  } = editingOptions;

  const onCommitChanges = React.useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        setData([...data, { id: startingAddedId, ...added }]);
      }
      if (changed) {
        setData(
          data.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
      }
      if (deleted !== undefined) {
        setData(data.filter((appointment) => appointment.id !== deleted));
      }
      setIsAppointmentBeingCreated(false);
    },
    [setData, setIsAppointmentBeingCreated, data]
  );
  const onAddedAppointmentChange = React.useCallback((appointment) => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
  }, []);

  const TimeTableCell = React.useCallback(
    React.memo(({ onDoubleClick, ...restProps }) => (
      <WeekView.TimeTableCell
        {...restProps}
        onDoubleClick={allowAdding ? onDoubleClick : undefined}
      />
    )),
    [allowAdding]
  );

  const CommandButton = React.useCallback(
    ({ id, ...restProps }) => {
      if (id === "deleteButton") {
        return (
          <AppointmentForm.CommandButton
            id={id}
            {...restProps}
            disabled={!allowDeleting}
          />
        );
      }
      return <AppointmentForm.CommandButton id={id} {...restProps} />;
    },
    [allowDeleting]
  );

  const allowDrag = useCallback(
    () => allowDragging && allowUpdating,
    [allowDragging, allowUpdating]
  );
  const allowResize = useCallback(
    () => allowResizing && allowUpdating,
    [allowResizing, allowUpdating]
  );

  return (
    <Fragment>
      <Paper>
        <label>Select Schedule: </label>
        <select value={sched} onChange={changeSched} style={{ marginTop: 10 }}>
          <option value={"maleSched"}>Male Schedule</option>
          <option value={"femaleSched"}>Female Schedule</option>
        </select>
        <Scheduler data={data} height={600}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={onCommitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />

          <IntegratedEditing />
          <WeekView
            startDayHour={6}
            endDayHour={24}
            timeTableCellComponent={TimeTableCell}
          />

          <Appointments />

          <AppointmentTooltip showOpenButton showDeleteButton={allowDeleting} />
          <Resources data={resources} mainResourceName="colorId" />
          <AppointmentForm
            commandButtonComponent={CommandButton}
            readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
          />
          <DragDropProvider allowDrag={allowDrag} allowResize={allowResize} />
        </Scheduler>
      </Paper>
    </Fragment>
  );
};

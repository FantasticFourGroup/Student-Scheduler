import React, { useState, useCallback, Fragment, useEffect } from "react";
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
  AppointmentTooltip,
  DragDropProvider,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";

import { resourcesData } from "../demo-data/resources";

import hasNoOverlaps from "./utils/overlapChecker";
import { appointmentsRecords } from "../demo-data/appointment_record";

import FormAppointment from "./FormAppointment";
import { Button } from "@mui/material";

import { toDate } from "./utils/timeFormat";

import { AppointmentModel, RecordsModel } from "./Models";

const currentDate = "2018-06-27";

const resources = [
  {
    fieldName: "colorId",
    title: "Color",
    instances: resourcesData,
  },
];

const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function makeAppointmentModels(
  records: RecordsModel,
  selectedItem: number[]
): AppointmentModel[] {
  return selectedItem.flatMap((item: number) => {
    const { title, stubCode, start, end, days, id, colorId } = records[item];
    return days.flatMap((day: string, i: number) => {
      return {
        title: (days.length > 1 ? "🔂 " : "") + title + " " + stubCode,
        startDate: toDate(day, start),
        endDate: toDate(day, end),
        id: Number(`${id}.${i}`),
        colorId,
      };
    });
  });
}

export default () => {
  const [records, setRecords] = useState(appointmentsRecords);
  const [selectedAppointments, setSelectedAppointments] = useState(sample);
  const [selectedValues, setSelectedValue] = useState(
    selectedAppointments.join(", ")
  );
  const [data, setData] = useState(
    makeAppointmentModels(records, selectedAppointments)
  );

  const [openAppointmentForm, setOpenAppoinmentForm] = useState(false);
  const [editAppointment, setEditAppointment] = useState(0);

  const onCommitChanges = useCallback(
    ({ added, changed, deleted }) => {
      if (deleted) {
        setData(
          data.filter((appointment) => Math.trunc(appointment.id) !== deleted)
        );
      } else {
        const toCheck = added ?? {
          ...(Object.values(changed)[0] as AppointmentModel),
          id: Object.keys(changed)[0],
        };

        if (hasNoOverlaps(toCheck, data)) {
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
        } else {
          alert("You have overlapping Schedule"); // ALERTT
        }
      }
    },
    [setData, data]
  );

  const LayoutComponent = useCallback(({ ...restProps }) => {
    return (
      <AppointmentTooltip.Layout
        {...restProps}
        onOpenButtonClick={() => {
          setOpenAppoinmentForm(true);
          setEditAppointment(restProps.appointmentMeta.data.id);
        }}
      />
    );
  }, []);

  function handleOpenAppointmentForm() {
    setOpenAppoinmentForm(true);
  }

  function closeAppointmentForm() {
    setEditAppointment(0);
    setOpenAppoinmentForm(false);
  }

  function handleSubmit(records: RecordsModel) {
    setRecords(records);
    // setData(makeAppointmentModels(records, selectedAppointments));
  }

  const addSubject = () => {
    setSelectedAppointments(selectedValues.match(/\d+/gi)!.map(Number));
  };

  useEffect(() => {
    const newAppointments = makeAppointmentModels(
      records,
      selectedAppointments
    ).reduce((previous, current, i) => {
      if (i < 1) {
        return [current];
      } else if (hasNoOverlaps(current, previous)) {
        return [...previous, current];
      }
      alert(`Overlaps on: ${current.title}`);
      return previous;
    }, data);

    setData(newAppointments);
  }, [selectedAppointments]);

  return (
    <Fragment>
      <Paper>
        <input
          type="text"
          style={{ width: 900 }}
          value={selectedValues}
          onChange={(e) => {
            setSelectedValue(e.currentTarget.value);
          }}
        />
        <button onClick={addSubject}>Add schedule</button>
        <FormAppointment
          open={openAppointmentForm}
          close={closeAppointmentForm}
          appointmentId={editAppointment}
          records={records}
          onSubmit={handleSubmit}
        ></FormAppointment>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "2%",
            paddingRight: "2%",
            paddingTop: "1%",
            paddingBottom: "1%",
          }}
        >
          <div>
            <Button variant="contained" onClick={handleOpenAppointmentForm}>
              Create Course Schedule
            </Button>
          </div>
        </div>
        <Scheduler data={data} height={600}>
          <ViewState currentDate={currentDate} />
          <EditingState onCommitChanges={onCommitChanges} />

          <IntegratedEditing />
          <WeekView startDayHour={6} endDayHour={24} />

          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton={true}
            layoutComponent={LayoutComponent}
          />
          <Resources data={resources} mainResourceName="colorId" />
          <DragDropProvider allowDrag={() => true} allowResize={() => true} />
        </Scheduler>
      </Paper>
    </Fragment>
  );
};

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
import AddIcon from "@mui/icons-material/Add";

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

const sample = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]];

function makeAppointmentModels(records: RecordsModel): AppointmentModel[] {
  return sample[0].flatMap((item: number) => {
    const { title, stubCode, start, end, days, id, colorId } = records[item];
    return days.flatMap((day: string) => {
      return {
        title: (days.length > 1 ? "🔂 " : "") + title + " " + stubCode,
        startDate: toDate(day, start),
        endDate: toDate(day, end),
        id,
        colorId,
      };
    });
  });
}

export default () => {
  const [records, setRecords] = useState(appointmentsRecords);
  const [data, setData] = useState(makeAppointmentModels(records));

  const [sched, setSched] = useState("maleSched");
  const [openAppointmentForm, setOpenAppoinmentForm] = useState(false);
  const [editAppointment, setEditAppointment] = useState(0);

  const onCommitChanges = useCallback(
    ({ added, changed, deleted }) => {
      if (deleted) {
        setData(data.filter((appointment) => appointment.id !== deleted));
      } else {
        const toCheck = added ?? {
          ...(Object.values(changed)[0] as AppointmentModel),
          id: Object.keys(changed)[0],
        };

        if (hasNoOverlaps(toCheck, data as [AppointmentModel])) {
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
    setData(makeAppointmentModels(records));
  }

  return (
    <Fragment>
      <Paper>
        {/* <button onClick={handleOpen}>Open modal</button> */}
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
            <label>Select Schedule: </label>
            <select
              value={sched}
              // onChange={changeSched}
              style={{ marginTop: 10 }}
            >
              <option value={"maleSched"}>Male Schedule</option>
              <option value={"femaleSched"}>Female Schedule</option>
            </select>
          </div>
          <div>
            <Button variant="contained" onClick={handleOpenAppointmentForm}>
              <AddIcon />
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
            // commandButtonComponent={CommandButton}
            layoutComponent={LayoutComponent}
          />
          <Resources data={resources} mainResourceName="colorId" />
          <DragDropProvider allowDrag={() => true} allowResize={() => true} />
        </Scheduler>
      </Paper>
    </Fragment>
  );
};

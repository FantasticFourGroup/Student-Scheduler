/* eslint-disable
consistent-return,
array-callback-return,
object-curly-newline,
react/jsx-no-bind,
react/button-has-type,
no-alert,
no-inner-declarations,
react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from "react";
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
import { ref, set, onValue } from "firebase/database";

import { Button } from "@mui/material";
import { resourcesData } from "../demo-data/resources";
import hasNoOverlaps from "./utils/overlapChecker";
import { emptyAppointmentRecords } from "../demo-data/appointment_record";
import FormAppointment from "./FormAppointment";
import { toDate, getTimeFormat } from "./utils/timeFormat";
import { AppointmentModel, AppointmentRecord, RecordsModel } from "./Models";
import database from "./utils/firebase";

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
  selectedItem: number[],
): AppointmentModel[] {
  if (Object.keys(records).length === 0) {
    return [];
  }
  return selectedItem.flatMap((item: number) => {
    const { title, stubCode, start, end, days, id, colorId } = records[item];
    return days.flatMap((day: string, i: number) => ({
      title: `${(days.length > 1 ? "🔂 " : "") + title} ${stubCode}`,
      startDate: toDate(day, start),
      endDate: toDate(day, end),
      id: Number(`${id}.${i}`),
      colorId,
    }));
  });
}

export default function App() {
  const [records, setRecords] = useState(emptyAppointmentRecords);
  const [selectedAppointments, setSelectedAppointments] = useState(sample);
  const [selectedValues, setSelectedValue] = useState(
    selectedAppointments.join(", "),
  );
  const [data, setData] = useState(
    makeAppointmentModels(records, selectedAppointments),
  );

  const [openAppointmentForm, setOpenAppoinmentForm] = useState(false);
  const [editAppointment, setEditAppointment] = useState(0);

  useEffect(() => {
    const appointmentsRef = ref(database, "appointments");
    onValue(appointmentsRef, (snapshot) => {
      if (!snapshot.exists()) {
        return;
      }
      const appointments = snapshot.val();
      setRecords(appointments);
    });
  }, []);

  const onCommitChanges = useCallback(
    ({ added, changed, deleted }) => {
      if (deleted) {
        const selected = selectedAppointments.filter(
          (values) => values !== Math.floor(deleted),
        );
        setSelectedAppointments(selected);
        setSelectedValue(selected.join(", "));
      } else {
        const toCheck = added ?? {
          ...(Object.values(changed)[0] as AppointmentModel),
          id: Object.keys(changed)[0],
        };

        if (hasNoOverlaps(toCheck, data)) {
          if (changed) {
            const key = Object.keys(changed)[0];
            const mainId = Math.floor(Number(key));

            function makeModifiedRecord(
              previous: AppointmentRecord,
              current: AppointmentModel,
            ) {
              const newRecord = {
                ...previous,
                start: getTimeFormat(current.startDate),
                end: getTimeFormat(current.endDate),
                days: [current.startDate.getDay().toString()],
              };

              if (previous.days.length > 1) {
                // eslint-disable-next-line array-callback-return
                const intactDays = previous.days.filter((day, i) => {
                  if (
                    i !== Number(key.split(".")[1]) &&
                    !(Number.isInteger(Number(key)) && i < 1)
                  ) {
                    return day;
                  }
                });
                return {
                  ...newRecord,
                  days: [...intactDays, ...newRecord.days],
                };
              }
              return newRecord;
            }

            set(ref(database, "appointments"), {
              ...records,
              [mainId]: makeModifiedRecord(records[mainId], changed[key]),
            });

            setRecords({
              ...records,
              [mainId]: makeModifiedRecord(records[mainId], changed[key]),
            });

            // console.log(
            //   makeAppointmentModels(
            //     {
            //       1: makeModifiedRecord(
            //         appointmentsRecords[mainId],
            //         changed[key],
            //       ),
            //     },
            //     [1],
            //   ),
            // );
            // const conflict = makeAppointmentModels(
            //   {
            //     1: makeModifiedRecord(
            //       appointmentsRecords[mainId],
            //       changed[key],
            //     ),
            //   },
            //   [1],
            // ).filter((item) => !hasNoOverlaps(item, data));
            // console.log(conflict);
          }
        } else {
          // eslint-disable-next-line no-alert
          alert("You have overlapping Schedule"); // ALERTT
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setData, data],
  );

  const LayoutComponent = useCallback(
    ({ ...restProps }) => (
      <AppointmentTooltip.Layout
        {...restProps}
        onOpenButtonClick={() => {
          setOpenAppoinmentForm(true);
          setEditAppointment(Math.floor(restProps.appointmentMeta.data.id));
        }}
      />
    ),
    [],
  );

  function handleOpenAppointmentForm() {
    setOpenAppoinmentForm(true);
  }

  function closeAppointmentForm() {
    setEditAppointment(0);
    setOpenAppoinmentForm(false);
  }

  // eslint-disable-next-line no-shadow
  function handleSubmit(records: RecordsModel) {
    setRecords(records);
    set(ref(database, "appointments"), records);
    // setData(makeAppointmentModels(records, selectedAppointments));
  }

  const addSubject = () => {
    setSelectedAppointments(selectedValues.match(/\d+/gi)!.map(Number));
  };

  useEffect(() => {
    const newAppointments = makeAppointmentModels(
      records,
      selectedAppointments,
    ).reduce((previous, current, i) => {
      if (i < 1) {
        return [current];
      }
      if (hasNoOverlaps(current, previous)) {
        return [...previous, current];
      }
      alert(`Overlaps on: ${current.title}`);
      return previous;
    }, data);
    setData(newAppointments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAppointments, records]);

  return (
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
      />
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
          showDeleteButton
          layoutComponent={LayoutComponent}
        />
        <Resources data={resources} mainResourceName="colorId" />
        <DragDropProvider allowDrag={() => true} allowResize={() => true} />
      </Scheduler>
    </Paper>
  );
}

/* eslint-disable implicit-arrow-linebreak */
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

import { resourcesData } from "../demo-data/resources";
import getOverlaps from "./utils/overlapChecker";
import {
  appointmentsRecords,
  emptyAppointmentRecords,
} from "../demo-data/appointment_record";
import FormAppointment from "./components/FormAppointment";
import AlertSnackBar from "./components/AlertSnackBar";
import OptionsDial from "./components/OptionsDial";
import SubjectModal from "./components/SubjectModal";
import { toDate, getTimeFormat } from "./utils/timeFormat";
import {
  AppointmentModel,
  AppointmentRecord,
  RecordsModel,
} from "./types/Models";
import database from "./utils/firebase";
import RemoveRecord from "./components/Delete";

const currentDate = "2018-06-27";

const resources = [
  {
    fieldName: "colorId",
    title: "Color",
    instances: resourcesData,
  },
];

function makeAppointmentModels(
  records: RecordsModel,
  selectedItem: number[],
): AppointmentModel[] {
  if (Object.keys(records).length === 0 || selectedItem.length === 0) {
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
      checked: false,
    }));
  });
}

export default function App() {
  const [records, setRecords] = useState(emptyAppointmentRecords);
  const [selectedAppointments, setSelectedAppointments] = useState(
    [] as number[],
  );
  const [data, setData] = useState(
    makeAppointmentModels(records, selectedAppointments),
  );

  const [openAppointmentForm, setOpenAppoinmentForm] = useState(false);
  const [editAppointment, setEditAppointment] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openSubjectModal, setOpenSubjectModal] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);

  useEffect(() => {
    const currentScheduleRef = ref(database, "currentSchedule");
    const appointmentsRef = ref(database, "appointments");

    onValue(currentScheduleRef, (snapshot) => {
      if (!snapshot.exists()) {
        setSelectedAppointments([]);
      } else {
        setSelectedAppointments(snapshot.val());
      }
    });
    onValue(appointmentsRef, (snapshot2) => {
      if (!snapshot2.exists()) {
        return;
      }
      const appointments = snapshot2.val();
      setRecords(appointments);
    });
    setFetched(true);
  }, []);

  // useEffect(() => {
  //   console.log("imma in", records);
  //   if (fetched) {
  //     console.log("imma in");
  //     const appointmentsRef = ref(database, "appointments");
  //     set(appointmentsRef, records);
  //   }
  // }, [records, fetched]);

  useEffect(() => {
    if (fetched) {
      const currentScheduleRef = ref(database, "currentSchedule");
      set(currentScheduleRef, selectedAppointments);
    }
  }, [selectedAppointments, fetched]);

  const onCommitChanges = useCallback(
    ({ added, changed, deleted }) => {
      if (deleted) {
        const selected = selectedAppointments.filter(
          (values) => values !== Math.floor(deleted),
        );
        setSelectedAppointments(selected);
      } else {
        const toCheck = added ?? {
          ...(Object.values(changed)[0] as AppointmentModel),
          id: Number(Object.keys(changed)[0]),
        };
        if (!getOverlaps(toCheck, data)) {
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

            const newRecord = {
              [mainId]: makeModifiedRecord(records[mainId], changed[key]),
            };
            const conflicts = makeAppointmentModels(newRecord, [mainId])
              .filter((record: AppointmentModel) => getOverlaps(record, data))
              .filter(
                (item) =>
                  !data.find(
                    (record) => JSON.stringify(item) === JSON.stringify(record),
                  ),
              );

            if (conflicts.length < 1) {
              set(ref(database, "appointments"), {
                ...records,
                ...newRecord,
              });

              setRecords({
                ...records,
                ...newRecord,
              });
            } else {
              setOpenSnackBar(true);
            }
          }
        } else {
          setOpenSnackBar(true);
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

  useEffect(() => {
    if (selectedAppointments.length === 0) {
      setData([]);
    } else {
      const newAppointments = makeAppointmentModels(
        records,
        selectedAppointments,
      ).reduce((previous, current, i) => {
        if (i < 1) {
          return [current];
        }
        if (!getOverlaps(current, previous)) {
          return [...previous, current];
        }
        // alert(`Overlaps on: ${current.title}`);
        setOpenSnackBar(true);
        return previous;
      }, data);
      setData(newAppointments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAppointments, records]);

  return (
    <Paper>
      <button
        onClick={() => {
          const currentScheduleRef = ref(database, "currentSchedule");
          const appointmentsRef = ref(database, "appointments");

          set(appointmentsRef, appointmentsRecords);
          set(currentScheduleRef, []);
          console.log("refresh");
        }}
      >
        Demo Data
      </button>
      <RemoveRecord
        selected={selectedAppointments}
        setSelected={setSelectedAppointments}
        records={records}
        setRecords={setRecords}
        open={removeModal}
        onClose={() => {
          setRemoveModal(false);
          const appointmentsRef = ref(database, "appointments");
          set(appointmentsRef, records);
        }}
      />
      <FormAppointment
        open={openAppointmentForm}
        close={closeAppointmentForm}
        appointmentId={editAppointment}
        records={records}
        onSubmit={handleSubmit}
      />
      <AlertSnackBar open={openSnackBar} setOpen={setOpenSnackBar} />
      <SubjectModal
        openModal={openSubjectModal}
        setOpenModal={setOpenSubjectModal}
        records={records}
        appointments={selectedAppointments}
        setRecords={setRecords}
        setAppointments={setSelectedAppointments}
      />
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
      <OptionsDial
        clickCourse={handleOpenAppointmentForm}
        clickSubject={setOpenSubjectModal}
        clickRemove={setRemoveModal}
      />
    </Paper>
  );
}

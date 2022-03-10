import { AppointmentModel } from "@devexpress/dx-react-scheduler";

export function inRange(start?: Number, end?: Number, num?: Number) {
  if (num && start && end) {
    return start < num && end > num;
  }
  return false;
}

export default function hasNoOverlaps(
  appointment: AppointmentModel,
  appointmentList: AppointmentModel[],
) {
  const appStart = appointment.startDate
    ? new Date(appointment.startDate).getTime()
    : undefined;
  const appEnd = appointment.startDate
    ? new Date(appointment.endDate).getTime()
    : undefined;

  const found = appointmentList.find((item) => {
    const itemStart = new Date(item.startDate).getTime();
    const itemEnd = new Date(item.endDate).getTime();

    if (itemStart === appStart && itemEnd === appEnd) {
      return true;
    }
    if (item.id !== appointment.id) {
      return (
        inRange(itemStart, itemEnd, appStart) ||
        inRange(itemStart, itemEnd, appEnd) ||
        inRange(appStart, appEnd, itemStart) ||
        inRange(appStart, appEnd, itemEnd)
      );
    }
    return false;
  });
  return !found;
}

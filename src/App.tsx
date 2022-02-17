import * as React from "react";
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
} from "@devexpress/dx-react-scheduler-material-ui";

import { appointments } from "../demo-data/appointments";

const PREFIX = "Demo";
// #FOLD_BLOCK
export const classes = {
	container: `${PREFIX}-container`,
	text: `${PREFIX}-text`,
	formControlLabel: `${PREFIX}-formControlLabel`,
};

const currentDate = "2018-06-27";

export default () => {
	const [data, setData] = React.useState(appointments);
	const [editingOptions, setEditingOptions] = React.useState({
		allowAdding: true,
		allowDeleting: true,
		allowUpdating: true,
		allowDragging: true,
		allowResizing: true,
	});
	const [addedAppointment, setAddedAppointment] = React.useState({});
	const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] =
		React.useState(false);

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

	const TimeTableCell = React.useCallback(
		React.memo(({ onDoubleClick, ...restProps }: any) => (
			<WeekView.TimeTableCell
				{...restProps}
				onDoubleClick={allowAdding ? onDoubleClick : undefined}
			/>
		)),
		[allowAdding]
	);

	const allowDrag = React.useCallback(
		() => allowDragging && allowUpdating,
		[allowDragging, allowUpdating]
	);
	const allowResize = React.useCallback(
		() => allowResizing && allowUpdating,
		[allowResizing, allowUpdating]
	);

	return (
		<React.Fragment>
			<Paper>
				<Scheduler data={data} height={600}>
					<ViewState currentDate={currentDate} />
					<EditingState
						onCommitChanges={onCommitChanges}
						addedAppointment={addedAppointment}
					/>

					<IntegratedEditing />
					<WeekView
						startDayHour={9}
						endDayHour={19}
						timeTableCellComponent={TimeTableCell}
					/>

					<Appointments />

					<AppointmentTooltip showOpenButton showDeleteButton={allowDeleting} />
					<AppointmentForm
						readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
					/>
					<DragDropProvider allowDrag={allowDrag} allowResize={allowResize} />
				</Scheduler>
			</Paper>
		</React.Fragment>
	);
};

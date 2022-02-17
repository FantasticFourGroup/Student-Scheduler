import React, { useState, useCallback, memo } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
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

interface Props {
	classes: any;
}

const PREFIX = "Demo";
// #FOLD_BLOCK
export const classes = {
	container: `${PREFIX}-container`,
	text: `${PREFIX}-text`,
	formControlLabel: `${PREFIX}-formControlLabel`,
};
// #FOLD_BLOCK
const StyledDiv = styled("div")(({ theme }) => ({
	[`&.${classes.container}`]: {
		margin: theme.spacing(2),
		padding: theme.spacing(2),
	},
	[`& .${classes.text}`]: theme.typography.h6,
	[`& .${classes.formControlLabel}`]: {
		...theme.typography.caption,
		fontSize: "1rem",
	},
}));

const currentDate = "2018-06-27";

export default () => {
	const [data, setData] = useState(appointments);
	const [editingOptions, setEditingOptions] = useState({
		allowAdding: true,
		allowDeleting: true,
		allowUpdating: true,
		allowDragging: true,
		allowResizing: true,
	});
	const [addedAppointment, setAddedAppointment] = useState({});
	const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] =
		useState(false);

	const {
		allowAdding,
		allowDeleting,
		allowUpdating,
		allowResizing,
		allowDragging,
	} = editingOptions;

	const onCommitChanges = useCallback(
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
	const onAddedAppointmentChange = useCallback((appointment) => {
		setAddedAppointment(appointment);
		setIsAppointmentBeingCreated(true);
	}, []);

	const TimeTableCell = useCallback(
		memo(({ onDoubleClick, ...restProps }: any) => (
			<WeekView.TimeTableCell
				{...restProps}
				onDoubleClick={allowAdding ? onDoubleClick : undefined}
			/>
		)),
		[allowAdding]
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
		<>
			<Paper>
				<Scheduler data={data} height={600}>
					<ViewState currentDate={currentDate} />
					<EditingState
						onCommitChanges={onCommitChanges}
						addedAppointment={addedAppointment}
						onAddedAppointmentChange={onAddedAppointmentChange}
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
		</>
	);
};

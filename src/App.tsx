import { useState } from "react";
import ReactDOM from "react-dom";
import "resize-observer-polyfill/dist/ResizeObserver.global";
import { TimeGridScheduler, classes } from "@remotelock/react-week-scheduler";
import "@remotelock/react-week-scheduler/index.css";
import "./index.css";

const rangeStrings = [
	["2019-03-03T22:45:00.000Z", "2019-03-04T01:15:00.000Z"],
	["2019-03-04T22:15:00.000Z", "2019-03-05T01:00:00.000Z"],
	["2019-03-05T22:00:00.000Z", "2019-03-06T01:00:00.000Z"],
	["2019-03-06T22:00:00.000Z", "2019-03-07T01:00:00.000Z"],
	["2019-03-07T05:30:00.000Z", "2019-03-07T10:00:00.000Z"],
	["2019-03-08T22:00:00.000Z", "2019-03-09T01:00:00.000Z"],
	["2019-03-09T22:00:00.000Z", "2019-03-10T01:00:00.000Z"],
];

const defaultSchedule = rangeStrings.map((range) =>
	range.map((dateString) => new Date(dateString))
);

export default function App() {
	const [schedule, setSchedule] = useState(defaultSchedule);

	return (
		<div
			className="root"
			style={{
				width: "100vw",
				height: "600px",
			}}
		>
			<TimeGridScheduler
				classes={classes}
				style={{ width: "100%", height: "100%" }}
				originDate={new Date("2019-03-04")}
				schedule={schedule}
				onChange={setSchedule}
				visualGridVerticalPrecision={15}
				verticalPrecision={15}
				cellClickPrecision={60}
			/>
		</div>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

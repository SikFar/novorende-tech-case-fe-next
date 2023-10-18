import CameraPositionButton from "@/ui/camera-postion-button/camera-position-button";
import { FlightController } from "@novorender/api";
import { ReadonlyQuat, ReadonlyVec3 } from "gl-matrix";

function CameraPositionsButtons(props: {
	controller: FlightController | undefined,
	moveTo: (p: ReadonlyVec3, r: ReadonlyQuat) => (void | undefined)
}) {
	return <div>
		<CameraPositionButton
			controller={props.controller}
			cameraNr={"one"}
			moveTo={props.moveTo}
		></CameraPositionButton>
		<CameraPositionButton
			controller={props.controller}
			cameraNr={"two"}
			moveTo={props.moveTo}
		></CameraPositionButton>
		<CameraPositionButton
			controller={props.controller}
			cameraNr={"three"}
			moveTo={props.moveTo}
		></CameraPositionButton>
	</div>;
}


export default CameraPositionsButtons;
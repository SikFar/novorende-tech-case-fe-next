
import './camera-position-button.css';
import { MouseEvent, useState } from "react";
import { ReadonlyQuat, ReadonlyVec3 } from "gl-matrix";
import { FlightController } from "@novorender/api";

interface CameraPositionButtonProps {
	cameraNr: string;
	controller: FlightController | undefined
	moveTo(cameraOnePosition: readonly [number, number, number] | Float32Array, cameraOneRotation: readonly [number, number, number, number] | Float32Array): void;
}

const CameraPositionButton = (props: CameraPositionButtonProps) => {


	const [cameraOnePosition, setCameraOnePosition] = useState<ReadonlyVec3>()
	const [cameraOneRotation, setCameraOneRotation] = useState<ReadonlyQuat>()


	const handleCameraBtnOneClick = (event: MouseEvent) => {
		if (event.type === 'click') {
			if (event.shiftKey) {
				setCameraOnePosition(props.controller?.position)
				setCameraOneRotation(props.controller?.rotation)
			} else if (cameraOnePosition && cameraOneRotation) {
				props.moveTo(cameraOnePosition, cameraOneRotation)
			}
		}
	}

	function getText() {
		if (cameraOnePosition && cameraOneRotation) {
			return 'Move to camera position ' + props.cameraNr
		} else {
			return 'Set camera position ' + props.cameraNr + ' (Shift + Click)'
		}
	}

	return (
		<button onClick={handleCameraBtnOneClick}>{getText()}</button>
	)
}

export default CameraPositionButton;
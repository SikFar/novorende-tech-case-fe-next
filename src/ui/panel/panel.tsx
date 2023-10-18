import { BuiltinCameraControllerType, FlightController, View } from "@novorender/api";
import { SceneData, SceneLoadFail } from "@novorender/data-js-api";
import SearchForm from "@/ui/search-form/search-form";
import './panel.css';
import CameraPositionsButtons from "@/ui/camera-position-buttons/camera-position-buttons";
import { ReadonlyQuat, ReadonlyVec3 } from "gl-matrix";

interface PanelParams {
	controller: FlightController | undefined;
	moveTo: (p: ReadonlyVec3, r: ReadonlyQuat) => void | undefined;
	viewToSearch: View<BuiltinCameraControllerType, Extract<keyof BuiltinCameraControllerType, string>> | undefined;
	sceneData: SceneData | SceneLoadFail | undefined;
}


function Panel(props: PanelParams) {
	return <div className="panel-container">
		<CameraPositionsButtons controller={props.controller}
		                        moveTo={props.moveTo}/>
		<SearchForm viewToSearch={props.viewToSearch}
		            sceneData={props.sceneData}></SearchForm>
	</div>;
}

export default Panel;
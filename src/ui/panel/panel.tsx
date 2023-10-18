import { BuiltinCameraControllerType, FlightController, View } from "@novorender/api";
import { SceneData, SceneLoadFail } from "@novorender/data-js-api";
import SearchForm from "@/ui/search-form/search-form";
import './panel.css';
import CameraPositionsButtons from "@/ui/camera-position-buttons/camera-position-buttons";

interface PanelParams {
	controller: FlightController | undefined;
	moveTo: (p, r) => void | undefined;
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
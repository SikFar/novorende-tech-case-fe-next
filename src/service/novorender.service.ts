import {
	BuiltinCameraControllerType,
	createNeutralHighlight,
	FlightController,
	getDeviceProfile,
	type RenderStateHighlightGroups,
	View,
} from "@novorender/api";
import { createAPI, type SceneData, SceneLoadFail } from "@novorender/data-js-api";

export const novorenderService = async (query: string, view: View, sceneData: SceneData, signal: AbortSignal): Promise<void> => {
	try {
		const {db} = sceneData;
		if (db) {
			let iterator = db.search({searchPattern: query}, signal);
			// In this example we just want to isolate the objects so all we need is the object ID
			let result: number[] = [];
			for await (const object of iterator) {
				result.push(object.id);
			}


			const renderStateHighlightGroups: RenderStateHighlightGroups = {
				defaultAction: result.length > 0 ? "hide" : undefined,
				groups: result.length > 0 ? [{action: createNeutralHighlight(), objectIds: result}] : [],
			};
			view.modifyRenderState({highlights: renderStateHighlightGroups});
		}
	} catch (e) {
		console.warn(e);
	}
}

export const initializeCanvas = async (canvas: HTMLCanvasElement | null, setView: (value: (((prevState: (View<BuiltinCameraControllerType, Extract<keyof BuiltinCameraControllerType, string>> | undefined)) => (View<BuiltinCameraControllerType, Extract<keyof BuiltinCameraControllerType, string>> | undefined)) | View<BuiltinCameraControllerType, Extract<keyof BuiltinCameraControllerType, string>> | undefined)) => void, setSceneData: (value: (((prevState: (SceneData | SceneLoadFail | undefined)) => (SceneData | SceneLoadFail | undefined)) | SceneData | SceneLoadFail | undefined)) => void, setController: (value: (((prevState: (FlightController | undefined)) => (FlightController | undefined)) | FlightController | undefined)) => void): Promise<void> => {
	const gpuTier = 2;
	const deviceProfile = getDeviceProfile(gpuTier);
	const baseUrl = new URL("/novorender/api/", location.origin);
	const imports = await View.downloadImports({baseUrl});
	const view = new View(canvas as HTMLCanvasElement, deviceProfile, imports);
	setView(view)

	const dataApi = createAPI({
		serviceUrl: "https://data.novorender.com/api",
	});

	const sceneData = await dataApi.loadScene("YOUR API KEY HERE");

	setSceneData(sceneData)
	const {url} = sceneData as SceneData;
	const config = await view.loadSceneFromURL(new URL(url));
	const {center, radius} = config.boundingSphere;
	view.activeController.autoFit(center, radius);
	const flightController = await view.switchCameraController("flight");

	setController(flightController)

	await view.run();
	view.dispose();
}

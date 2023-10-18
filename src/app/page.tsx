'use client'

import { useEffect, useRef, useState } from 'react'
import { FlightController, getDeviceProfile, View, } from "@novorender/api";
import { createAPI, type SceneData, SceneLoadFail } from "@novorender/data-js-api";

import './page.css';
import Panel from "@/ui/panel/panel";


export default function Home() {

	const canvas = useRef<HTMLCanvasElement>(null);

	const [controller, setController] = useState<FlightController>();
	const [sceneData, setSceneData] = useState<SceneData | SceneLoadFail>();
	const [view, setView] = useState<View>();

	useEffect(() => {
		main(canvas.current);
	}, [])


	async function main(canvas: HTMLCanvasElement | null) {
		const gpuTier = 2; // laptop with reasonably new/powerful GPU.
		// Get Device Profile
		const deviceProfile = getDeviceProfile(gpuTier);
		const baseUrl = new URL("/novorender/api/", location.origin);
		const imports = await View.downloadImports({baseUrl}); // or whereever you copied the public/ files from the package.
		// Create a View
		const view = new View(canvas as HTMLCanvasElement, deviceProfile, imports);
		setView(view)

		// load a predefined environment to set it as background
		const envIndexUrl = new URL("https://api.novorender.com/assets/env/index.json");
		const envs = await view.availableEnvironments(envIndexUrl);
		// modify the render state
		const dataApi = createAPI({
			serviceUrl: "https://data.novorender.com/api",
		});

		// Load scene metadata
		// Condos scene ID, but can be changed to any public scene ID
		const sceneData = await dataApi.loadScene("95a89d20dd084d9486e383e131242c4c");

		setSceneData(sceneData)
		// Destructure relevant properties into variables
		const {url} = sceneData as SceneData;
		// load the scene using URL gotten from `sceneData`
		const config = await view.loadSceneFromURL(new URL(url));
		const {center, radius} = config.boundingSphere;
		view.activeController.autoFit(center, radius);
		const flightController = await view.switchCameraController("flight");

		setController(flightController)

		// run the view
		await view.run();
		// dispose-off GPU resources
		view.dispose();
	}


	return (
		<main className='canvas-container'>
			{/*TODO: MOVE TO CSS*/}
			<canvas ref={canvas}
			        style={{width: '100%', height: '100%', background: 'grey'}}>
			</canvas>
			<Panel controller={controller}
			       moveTo={(p, r) => controller?.moveTo(p, 1000, r)}
			       viewToSearch={view}
			       sceneData={sceneData}/>
		</main>
	)
}
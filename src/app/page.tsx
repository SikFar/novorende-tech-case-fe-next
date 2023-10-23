'use client'

import { useEffect, useRef, useState } from 'react'
import { FlightController, View, } from "@novorender/api";
import { type SceneData, SceneLoadFail } from "@novorender/data-js-api";
import './page.css';
import Panel from "@/ui/panel/panel";
import { initializeCanvas } from "@/service/search-object";


export default function Home() {

	const canvas = useRef<HTMLCanvasElement>(null);

	const [controller, setController] = useState<FlightController>();
	const [sceneData, setSceneData] = useState<SceneData | SceneLoadFail>();
	const [view, setView] = useState<View>();

	useEffect(() => {
		main(canvas.current);
	}, [])


	async function main(canvas: HTMLCanvasElement | null) {
		await initializeCanvas(canvas, setView, setSceneData, setController);
	}


	return (
		<main className='canvas-container'>
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
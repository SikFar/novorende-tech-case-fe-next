import { createNeutralHighlight, type RenderStateHighlightGroups, type View } from "@novorender/api";
import { type SceneData } from "@novorender/data-js-api";

export const searchObject = async (query: string, view: View, sceneData: SceneData, signal: AbortSignal): Promise<void> => {
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
import { useState } from "react";
import { searchObject } from "@/util/search-object";
import { View } from "@novorender/api";
import { SceneData, SceneLoadFail } from "@novorender/data-js-api";

interface SearchFormProporties {
	viewToSearch: View | undefined;
	sceneData: SceneData | SceneLoadFail | undefined;

}

const SearchForm = (props: SearchFormProporties) => {
	const [searchObjectInput, setSearchObjectInput] = useState('');
	const [submitButtonText, setSubmitButtonText] = useState('Submit');
	const handleChange = (event) => {
		setSearchObjectInput(event.target.value);
	}

	const [abortController, setAbortController] = useState<AbortController>(new AbortController());

	const handleSubmit = (event) => {
		setSubmitButtonText('Searching...');

		if (submitButtonText === 'Searching...') {
			abortController.abort()
			alert('Aborted search for ' + searchObjectInput)
		}

		if (abortController.signal.aborted) {
			setAbortController(new AbortController());
		}

		searchObject(searchObjectInput, props.viewToSearch!, props.sceneData as SceneData, abortController.signal)
			.finally(() => {
				setSubmitButtonText('Submit');
			})
		event.preventDefault();
	}
	return (
		<form onSubmit={e => {
			handleSubmit(e)
		}}>
			<input type="text"
			       placeholder='Search object'
			       value={searchObjectInput}
			       onChange={handleChange}/>
			<input type="submit"
			       value={submitButtonText}/>
		</form>
	)
}

export default SearchForm;

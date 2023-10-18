import { FormEvent, useEffect, useState } from "react";
import { searchObject } from "@/service/search-object";
import { View } from "@novorender/api";
import { SceneData, SceneLoadFail } from "@novorender/data-js-api";

interface SearchFormProporties {
	viewToSearch: View | undefined;
	sceneData: SceneData | SceneLoadFail | undefined;

}

const SearchForm = (props: SearchFormProporties) => {
	const [searchObjectInput, setSearchObjectInput] = useState('');
	const [submitButtonText, setSubmitButtonText] = useState('Search');
	const [searching, setSearching] = useState(false);

	useEffect(() => {
		const timeOutId = setTimeout(() => {
			if (enableDynamicSearch) {
				handleSearchRequest();
			}

		}, 500);
		return () => clearTimeout(timeOutId);

	}, [searchObjectInput]);

	useEffect(() => {
		if (searching) {
			setSubmitButtonText('Searching...');
		} else {
			setSubmitButtonText('Search');
		}
	}, [searching]);

	const [abortController, setAbortController] = useState<AbortController>(new AbortController());

	const [enableDynamicSearch, setEnableDynamicSearch] = useState(false);

	function handleSearchRequest() {
		setSearching(true)
		if (searching) {
			abortController.abort()
		}

		if (abortController.signal.aborted) {
			setAbortController(new AbortController());
		}

		searchObject(searchObjectInput, props.viewToSearch!, props.sceneData as SceneData, abortController.signal)
			.finally(() => {
				setSearching(false)
			})
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		handleSearchRequest();
		event.preventDefault();
	}
	return (
		<form onSubmit={e => {
			handleSubmit(e)
		}}>
			<input type="text"
			       placeholder='Search object'
			       value={searchObjectInput}
			       onChange={e => setSearchObjectInput(e.target.value)}/>
			{!enableDynamicSearch && <input type="submit"
                                            value={submitButtonText}/>
			}

			<input type='checkbox'
			       id='enableDynamicSearch'
			       onChange={e => {
				       setEnableDynamicSearch(e.target.checked)
			       }}
			       value={enableDynamicSearch ? 1 : 0}
			/>
			<label style={{color: 'white'}}
			       htmlFor="enableDynamicSearch">Enable dynamic search</label>
		</form>
	)
}

export default SearchForm;

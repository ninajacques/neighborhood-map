import React, { Component } from 'react'
import {DebounceInput} from 'react-debounce-input'
import ErrorBoundary from './ErrorBoundary.js'

class Search extends Component {

	render() {

		const {query,updateSearch,locations, clickedList} = this.props

		return (
			<ErrorBoundary>
				<div className='search-box'>
					<DebounceInput className='search-field' type="text" placeholder="Search a Bakery" value={query} onChange = {(evt) => updateSearch(evt.target.value)} />
					<div className='search-results'>
						<ul>						
							{locations.map((location) => (
								<li key={location.id} onClick={() => clickedList(location)}>{location.name}</li>
							))}
						</ul>
					</div>
				</div>
			</ErrorBoundary>
		)
	}
}


export default Search
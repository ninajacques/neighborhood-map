import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import ErrorBoundary from './ErrorBoundary.js'
import MapControl from './MapControl.js'

/* render map, markers and infowindow when marker is clicked */ 
const MapRender = withScriptjs(withGoogleMap(props =>
  	<GoogleMap
    defaultZoom={16}
    defaultCenter={{lat:  -27.592269,lng: -48.549027 }}
  	>
  		{props.locations.map((location) => (

			<Marker key={location.id} position={location.myLatLng} animation={location.animation} title={location.name} onClick={() => props.handleToggleShowInfo(location)}>
			{location.infowindowIsOpen && 
			<InfoWindow position={location.myLatLng}>
				<div>
					<h3>{location.name}</h3>
					<p>{location.address}</p>
					{location.display_phone !== "" && 
						<p>Phone: {location.display_phone}</p> 
					}
					<p>Rating: {location.rating} </p>
					<img src={location.photo} alt={location.name} className='photo' />
					<p>Powered by <strong><a href="http://yelp.com">Yelp!</a></strong></p>
				</div>
			</InfoWindow>
			}
			</Marker>
  		))}
  		<MapControl className='search-btn' position={window.google.maps.ControlPosition.TOP_LEFT}>
      		<button className='trigger' onClick={() => props.toggleSearchbox()} type='button'></button>
    	</MapControl>
  	</GoogleMap>
))


class Map extends Component {

	render() {
		return (
			<ErrorBoundary>
				<MapRender
				{...this.props}
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDF6aRd7f7QvgdzsYubDJRob3fWKTOPQlM&v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div className='map' />}
				mapElement={<div style={{ height: `100%` }} />}
				containerProps={{tabIndex: 0}}
				/>
			</ErrorBoundary>
		)
	}
}

export default Map;
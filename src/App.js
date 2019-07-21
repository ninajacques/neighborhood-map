import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Map from './components/Map.js'
import Search from './components/Search.js'
import ErrorBoundary from './components/ErrorBoundary.js'

class App extends Component {
  state = {
    locations: [],
    filteredLocations: [],
    query:"",
    isSearchboxVisible: false
  }

   /* get all locations and store on state */
  componentDidMount() {
    const apiKey = 'z6lXb1ZED75LxNd1iS-SvKXz4SgAebxBmbAgN_c-H6NPtv-DY306ZqOW-mbwJ7eGieVV2L0FiOdNfWj3xaAtDZfOfwPIaUpy02cUlLtKByM-zIneCnDHZ4jp8-UrXXYx'

    const config = {
      headers: {'Authorization': `Bearer ${apiKey}`},
      params: {
        term: 'bakeries',
        latitude: -27.592269,
        longitude: -48.549027,
        radius: 1000,
        sort_by: 'rating'
      }
    };

    axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', config)
    .then(response => {     
      let locations = response.data.businesses.map(location => {
        return {
          myLatLng:{lat: location.coordinates.latitude, lng: location.coordinates.longitude},
          name: location.name,
          id: location.id,
          display_phone: location.display_phone,
          rating: location.rating,
          photo: location.image_url,
          address: location.location.address1,
          infowindowIsOpen: false,
          animation: window.google.maps.Animation.DROP,
        }
      })
      this.setState({locations:locations, filteredLocations:locations})
    })
  }

  /* hide all infowindow */
  hideInfoWindow = () => {
    const infowindow = this.state.locations.map(location => {
      location.infowindowIsOpen = false
      return location
    })
    this.setState({locations: Object.assign(this.state.locations, infowindow)})
  }

  /* toggle visualization of infowindow */
  handleToggleShowInfo = (location) => {
    if (location.infowindowIsOpen === false) {
      this.hideInfoWindow()
      location.infowindowIsOpen = true
    } else {
      this.hideInfoWindow()
    }
    this.setState({filteredLocations: Object.assign(this.state.filteredLocations, location)})
  }

  /* change query and returns search results */
  updateSearch = (query) => {
    this.hideInfoWindow()
    this.setState({ query: query })
    const search = this.state.locations.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
    if(query && search.length > 0)  {
      this.setState({ filteredLocations: search })
    } else if (query && search.length === 0){         
      this.setState({ filteredLocations: [] })
    } else {
      this.setState({ filteredLocations: this.state.locations })
    }
  } 
  
  toggleSearchbox = () => {
    this.setState(prevState => ({ isSearchboxVisible: !prevState.isSearchboxVisible }));
  };

  clickedList = (location) => {
    this.toggleSearchbox()
    this.handleToggleShowInfo(location)
  }

  render() {
    return (
      <div className={`app ${this.state.isSearchboxVisible ? 'open' : '' }`}>
        <ErrorBoundary>
          <aside className='aside'>
            <Search
            query={this.state.query} 
            clickedList={this.clickedList}  
            locations={this.state.filteredLocations} 
            updateSearch={this.updateSearch} 
            tabIndex='0'/>
          </aside>
          <Map locations={this.state.filteredLocations}
            toggleSearchbox={this.toggleSearchbox}
            tabIndex='0' 
            handleToggleShowInfo={this.handleToggleShowInfo}
            role='application'/>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App

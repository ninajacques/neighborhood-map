import React, {Component} from 'react'

class ErrorBoundary extends Component {
 	constructor(props) {
    	super(props);
    	this.state = { error: false, errorInfo: null };
  	}

	componentDidCatch(error, errorInfo) {
    	this.setState({
      		error: error,
      		errorInfo: errorInfo
    	})
  	}

  	render() {
    	if (this.state.error) {
      		return (
      			<div>
      				<h1>Sorry, something happened wrong. The Error is: {this.state.errorInfo}</h1>
      			</div>
      		)
    	}
		return this.props.children
	}
}

export default ErrorBoundary
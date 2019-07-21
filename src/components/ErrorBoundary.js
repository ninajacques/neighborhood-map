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
      			<div className='error-boundary'>
      				<p><strong>Sorry, something happened wrong. The Error is:</strong></p>
              <p>{this.state.errorInfo.componentStack}</p>
      			</div>
      		)
    	}
		return this.props.children
	}
}

export default ErrorBoundary
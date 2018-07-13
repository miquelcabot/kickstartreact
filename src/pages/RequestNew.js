import React, { Component } from 'react';

class RequestNew extends Component {
    render() {
        return (
            <div>
                <h3>Request New {this.props.match.params.address}</h3>
            </div>
        );
    }
}

export default RequestNew

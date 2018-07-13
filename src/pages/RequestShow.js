import React, { Component } from 'react';

class RequestShow extends Component {
    render() {
        return (
            <div>
                <h3>Request Show {this.props.match.params.address}</h3>
            </div>
        );
    }
}

export default RequestShow

import React, { Component } from 'react';
import { Card, Button, Dimmer, Loader, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import factory from '../ethereum/factory';

class Home extends Component {
    state = {
        loadingPage: true,
        errorMessage: '',
        loading: false
    };

    componentDidMount = async () => {
        try {
            const campaigns = await factory.methods.getDeployedCampaigns().call();
        
            this.setState({ campaigns: campaigns })
        } finally {
            this.setState({ loadingPage: false })
        }
    }

    renderCampaigns() {
        if (!this.state.loadingPage) {
            const items = this.state.campaigns.map( address => {
                return {
                    header: address,
                    description: (
                        <Link to={`/campaigns/${address}`}>
                            <a>View Campaign</a>
                        </Link>
                    ),
                    fluid: true
                }
            });
            return <Card.Group items={items} />;
        }
    }

    render() {
        // Loading
        if (this.state.loadingPage) return (
            <div>
                <Segment style={{ height: '80vh' }}>
                    <Dimmer active inverted>
                        <Loader inverted content='Loading...' />
                    </Dimmer>
                </Segment>
            </div>
        );
      
        // Done
        return (
            <div>
                <h3>Open Campaigns</h3>
                <Link to="/campaigns/new">
                    <Button 
                        floated="right"
                        content = "Create Campaign"
                        icon = "add circle"
                        primary = {true}
                        />
                </Link>
                { this.renderCampaigns() }
            </div>
        );
    }
}

export default Home;

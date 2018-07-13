import React, { Component } from 'react';
import { Card, Button, Dimmer, Loader, Segment } from 'semantic-ui-react';
import factory from './ethereum/factory';
import Layout from './components/Layout';

class App extends Component {
    state = {
        loadingPage: true,
        errorMessage: '',
        loading: false
    };

    componentDidMount = async () => {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        
        this.setState({ loadingPage: false, campaigns: campaigns })
    }

    renderCampaigns() {
        if (!this.state.loadingPage) {
            const items = this.state.campaigns.map( address => {
                return {
                    header: address,
                    description: (
                      
                            <a>View Campaign</a>
                      
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
            <Layout>
                <div>
                    <Segment style={{ height: '80vh' }}>
                        <Dimmer active inverted>
                            <Loader inverted content='Loading...' />
                        </Dimmer>
                    </Segment>
                </div>
            </Layout>
        );
      
        // Done
        return (
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    <Button 
                        floated="right"
                        content = "Create Campaign"
                        icon = "add circle"
                        primary = {true}
                        />
                </div>
                { this.renderCampaigns() }
            </Layout>
        );
    }
}

export default App;

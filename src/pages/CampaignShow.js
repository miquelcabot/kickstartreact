import React, { Component } from 'react';
import { Card, Grid, Button, Dimmer, Loader, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import ContributeForm from '../components/ContributeForm';

class CampaignShow extends Component {
    state = {
        loadingPage: true,
        errorMessage: '',
        loading: false
    };

    componentDidMount = async () => {
        try {
            const campaign = Campaign(this.props.match.params.address);

            const summary = await campaign.methods.getSummary().call();

            this.setState({ 
                address: this.props.match.params.address,
                minimumContribution: summary[0],
                balance: summary[1],
                requestsCount: summary[2],
                approversCount: summary[3],
                manager: summary[4]
            })
        } finally {
            this.setState({ loadingPage: false })
        }
    }

    renderCards() {
        const items = [
            {
                header: this.state.manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: this.state.minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver'
            },
            {
                header: this.state.requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers'
            },
            {
                header: this.state.approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign'
            },
            {
                header: web3.utils.fromWei(this.state.balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend'
            }
        ];

        return <Card.Group items={items} />;
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
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            { this.renderCards() }
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm 
                                address={this.state.address}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link to={`/campaigns/${this.state.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default CampaignShow

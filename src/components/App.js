import React, {Component} from 'react'
import './App.css'
import {Card, Header, Grid, Segment, Modal} from 'semantic-ui-react'
import ConnectVersion from "./ConnectVersion"
import ConnectSetup from "./ConnectSetup"
import AccountInfo from "./AccountInfo"
import AccountBalances from "./AccountBalances"
import AccountUnlock from "./AccountUnlock";
import AccountResult from "./AccountResult";
import TransactionEntry from "./TransactionEntry";
import TransactionJson from "./TransactionJson";
import TransactionSend from "./TransactionSend";
import TransactionResult from "./TransactionResult";
import DeployContract from "./DeployContract";
import DeployContractResult from "./DeployContractResult";
import ContractInvocationsExecute from "./ContractInvocationsExecute";
import ContractInvocationsResult from "./ContractInvocationsResult";
import EventLogFilter from "./EventLogFilter";
import EventLogOption from "./EventLogOption";
import EventLogWatch from "./EventLogWatch";
import EventLogView from "./EventLogView";
import EventLogGetLogs from "./EventLogGetLogs";
import EventLogLogs from "./EventLogLogs";
import ContractEventsLatest from "./ContractEventsLatest";
import ContractEventsWatch from "./ContractEventsWatch";
import ContractEventsGet from "./ContractEventsGet";
import ContractEventsLogs from "./ContractEventsLogs";
import {inject, observer} from "mobx-react/index";

const gridRowStyle = {
    paddingTop: '30px'
}

@inject('web3Store')
@observer
class App extends Component {

    handleClose = () => {
        this.props.web3Store.showReminder = false
    }

    componentDidMount() {
        this.props.web3Store.doCheckMetaMask()
    }
    render() {
        return (
            <div>
                <Modal
                    size='mini'
                    open={this.props.web3Store.showReminder}
                    onClose={this.handleClose}
                    header='Reminder!'
                    content='Unlock MetaMask *and* click Get Accounts'
                    actions={[
                        { key: 'done', content: 'Ok', positive: true },
                    ]}
                />
                <Grid centered>
                    <Grid.Row style={gridRowStyle}>
                        <Grid.Column width={14}>
                            <Segment raised>
                                <Header as='h2' textAlign='center'>Connect</Header>
                                <Card.Group centered>
                                    <ConnectSetup/>
                                    <ConnectVersion/>
                                </Card.Group>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={gridRowStyle}>
                        <Grid.Column width={14}>
                            <Segment raised>
                                <Header as='h2' textAlign='center'>Accounts</Header>
                                <Card.Group centered>
                                    <AccountInfo/>
                                    <AccountBalances/>
                                </Card.Group>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={gridRowStyle}>
                        <Grid.Column width={14}>
                            <Segment raised>
                                <Header as='h2' textAlign='center'>UnLock & Lock Accounts</Header>
                                <Card.Group centered>
                                    <AccountUnlock/>
                                    <AccountResult/>
                                </Card.Group>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={gridRowStyle}>
                        <Grid.Column width={14}>
                            <Segment raised>
                                <Header as='h2' textAlign='center'>Transaction</Header>
                                <Card.Group centered>
                                    <TransactionEntry/>
                                    <TransactionJson/>
                                </Card.Group>
                                <Card.Group centered>
                                    <TransactionSend/>
                                    <TransactionResult/>
                                </Card.Group>

                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={gridRowStyle}>
                        <Grid.Column width={14}>
                            <Segment raised>
                                <Header as='h2' textAlign='center'>Deploy Contract</Header>
                                <Card.Group centered>
                                    <DeployContract/>
                                    <DeployContractResult/>
                                </Card.Group>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={gridRowStyle}>
                        <Grid.Column width={14}>
                            <Segment raised>
                                <Header as='h2' textAlign='center'>Contract Invocations</Header>
                                <Card.Group centered>
                                    <ContractInvocationsExecute/>
                                    <ContractInvocationsResult/>
                                </Card.Group>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={gridRowStyle}>
                        <Grid.Column width={14}>
                            <Segment raised>
                                <Header as='h2' textAlign='center'>Events & Logs : Filter, Watch, Get</Header>
                                <Card.Group centered>
                                    <EventLogFilter/>
                                    <EventLogOption/>
                                </Card.Group>
                                <Card.Group centered>
                                    <EventLogWatch/>
                                    <EventLogView/>
                                </Card.Group>
                                <Card.Group centered>
                                    <EventLogGetLogs/>
                                    <EventLogLogs/>
                                </Card.Group>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={gridRowStyle}>
                        <Grid.Column width={14}>
                            <Segment raised>
                                <Header as='h2' textAlign='center'>Contract Events</Header>
                                <Card.Group centered>
                                    <ContractEventsWatch/>
                                    <ContractEventsLatest/>
                                </Card.Group>
                                <Card.Group centered>
                                    <ContractEventsGet/>
                                    <ContractEventsLogs/>
                                </Card.Group>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default App;

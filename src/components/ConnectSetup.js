import React from 'react'
import {Card, Button, Form, Input, Message} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle, formStyle} from './CommonStyle'

const buttonStyle = {
    paddingTop: '10px'
}

@inject('web3Store')
@observer
export default class ConnectSetup extends React.Component {

    handleChange = (event) => {
        this.props.web3Store.providerUrl = event.target.value
    }

    handleConnect = () => {
        this.props.web3Store.doConnect()
        this.props.web3Store.setWeb3Version()
        this.props.web3Store.doGetAccounts()
    }

    handleNodeStatus = () => {
        this.props.web3Store.doGetNodeStatus()
    }


    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Setup</Card.Header>
                    <Message color={this.props.web3Store.connectStatus === 'Connected' ? 'green' : 'red'} >{this.props.web3Store.connectStatus}</Message>
                    <Form style={formStyle}>
                        <Input
                            name="provider"
                            label="Provider"
                            value={this.props.web3Store.providerUrl}
                            onChange={this.handleChange}
                        />
                    </Form>
                    <div style={buttonStyle}>
                        <Button primary onClick={this.handleConnect}>Connect</Button>
                        <Button primary onClick={this.handleNodeStatus}>Node Status</Button>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}

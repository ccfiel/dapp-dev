import React from 'react'
import {Card, Button} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class EventLogGetLogs extends React.Component {

    handleClickEventLogGet = (event, data) => {
        this.props.web3Store.doFilterGetLogs()
    }

    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Get Logs</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Button color='green' onClick={this.handleClickEventLogGet}>Get()</Button>
                </Card.Content>
            </Card>
        )
    }
}

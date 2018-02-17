import React from 'react'
import {Card, Button} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class EventLogWatch extends React.Component {

    handleClickWatch = (event) => {
        this.props.web3Store.doFilterWatchStart()
    }

    handleClickStopWatch = (event) => {
        this.props.web3Store.doFilterStopWatching()
    }

    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Watch</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Button color='green' onClick={this.handleClickWatch}>watch()</Button>
                    <Button color='red' onClick={this.handleClickStopWatch}>stopWatch()</Button>
                </Card.Content>
            </Card>
        )
    }
}

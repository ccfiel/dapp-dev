import React from 'react'
import {Card, Message} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class ConnectVersion extends React.Component {
    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Version</Card.Header>
                    <Message color='yellow' hidden={this.props.web3Store.versionInformation ? false : true}>{this.props.web3Store.versionInformation}</Message>
                </Card.Content>
            </Card>
        )
    }
}

import React from 'react'
import {Card} from 'semantic-ui-react'
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
                    <Card.Meta>{this.props.web3Store.versionInformation}</Card.Meta>
                </Card.Content>
            </Card>
        )
    }
}

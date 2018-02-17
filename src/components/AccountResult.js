import React from 'react'
import {Card, Message} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class AccountResult extends React.Component {
    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Un/Lock Result</Card.Header>
                    <Message color='yellow' hidden={this.props.web3Store.lockUnlockResult ? false : true}>{this.props.web3Store.lockUnlockResult}</Message>
                </Card.Content>
            </Card>
        )
    }
}

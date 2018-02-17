import React from 'react'
import {Card} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class TransactionResult extends React.Component {
    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Result</Card.Header>
                    <Card.Meta>
                        <a href={this.props.web3Store.etherScanIoTxLink} target='_blank'>{this.props.web3Store.sendTransactionErrorOrResult}</a>
                    </Card.Meta>
                </Card.Content>
            </Card>
        )
    }
}

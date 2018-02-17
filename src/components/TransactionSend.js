import React from 'react'
import {Card, Button} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class TransactionSend extends React.Component {
    handleClickSendTransaction = (event) => {
        this.props.web3Store.doSendTransaction()
    }

    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Send Ethers</Card.Header>
                </Card.Content>
                <Button color='green' onClick={this.handleClickSendTransaction}>Send Transaction</Button>

            </Card>
        )
    }
}

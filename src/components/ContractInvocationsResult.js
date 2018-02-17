import React from 'react'
import {Card, Label} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle, gapStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class ContractInvocationsResult extends React.Component {
    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Result</Card.Header>
                    <Label as='a' color='teal' ribbon='right'>Details</Label>
                    <div style={gapStyle}>
                        <p>{this.props.web3Store.invokeDetails}</p>
                    </div>
                    <Label as='a' color='yellow' ribbon='right'>Return</Label>
                    <div style={gapStyle}>
                        <p>{this.props.web3Store.invokeReturnValue}</p>
                    </div>
                    <Label as='a' color='blue' ribbon='right'>Transaction Hash</Label>
                    <div style={gapStyle}>
                        <a href={this.props.web3Store.invokeContractTransactionHashLink}
                           target='_blank'>{this.props.web3Store.invokeContractTransactionHash}</a>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}

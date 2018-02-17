import React from 'react'
import {Card, Label, Divider} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle, gapStyle} from './CommonStyle'

const headerStyle = {
    paddingBottom: '30px'
}


@inject('web3Store')
@observer
export default class DeployContractResult extends React.Component {
    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header style={headerStyle}>Result</Card.Header>
                    <Label as='a' color='teal' ribbon='right'>Transaction Hash</Label>
                    <div style={gapStyle}>
                        <a href={this.props.web3Store.contractTransactionHashLink}
                           target='_blank'>{this.props.web3Store.contractTransactionHash}</a>
                    </div>
                    <Divider/>
                    <Label as='a' color='yellow' ribbon='right'>Contract Address</Label>
                    <div style={gapStyle}>
                        <a href={this.props.web3Store.contractAddressLink}
                           target='_blank'>{this.props.web3Store.contractAddress}</a>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}

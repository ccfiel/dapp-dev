import React from 'react'
import {Card, Menu, List, Icon, Label} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class ContractEventsLatest extends React.Component {
    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Events/Logs (5 Latest)</Card.Header>
                    <List ordered>
                        {this.props.web3Store.watchContractEventsList.map((item, index) => (
                            <List.Item key={index} as='a'>
                                <a href={this.props.web3Store.createEtherScanIoUrl('tx', this.props.web3Store.invokeContractTransactionHashLink)}
                                   target='_blank'>{item.transactionHash}</a>
                            </List.Item>
                        ))}
                    </List>
                    <Menu compact>
                        <Menu.Item as='a'>
                            <Icon name='mail'/> Received
                            <Label color='teal' floating>{this.props.web3Store.watchContractInstanceEventCount}</Label>
                        </Menu.Item>
                    </Menu>
                </Card.Content>
            </Card>
        )
    }
}

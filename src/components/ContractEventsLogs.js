import React from 'react'
import {Card, Menu, List, Icon, Label} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class ContractEventsLogs extends React.Component {
    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Logs</Card.Header>
                    <List ordered>
                        {this.props.web3Store.getContractInstanceLogList.map((item, index) => (
                            <List.Item key={index} as='a'>
                                <a href={this.props.web3Store.createEtherScanIoUrl('tx', this.props.web3Store.invokeContractTransactionHashLink)}
                                   target='_blank'>{item.transactionHash}</a>
                            </List.Item>
                        ))}
                    </List>
                    <Menu compact>
                        <Menu.Item as='a'>
                            <Icon name='mail'/> Received
                            <Label color='teal' floating>{this.props.web3Store.getContractInstanceLogCount}</Label>
                        </Menu.Item>
                    </Menu>
                </Card.Content>
            </Card>
        )
    }
}

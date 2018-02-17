import React from 'react'
import {Card, Label, Menu, Icon, List} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle} from './CommonStyle'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

@inject('web3Store')
@observer
export default class EventLogLogs extends React.Component {
    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Logs</Card.Header>
                    <Label as='a' color='yellow' ribbon='right'>Applied</Label>
                    <SyntaxHighlighter language='json' style={docco}>{this.props.web3Store.appliedLogFilter}</SyntaxHighlighter>
                    <Menu compact>
                        <Menu.Item as='a'>
                            <Icon name='mail' /> Received
                            <Label color='teal' floating>{this.props.web3Store.getLogCount}</Label>
                        </Menu.Item>
                    </Menu>
                </Card.Content>
                <Card.Content>
                    <List ordered>
                        {this.props.web3Store.getLogsList.map((item, index) => (
                            <List.Item key={index} as='a'>
                                <a href={this.props.web3Store.createEtherScanIoUrl('tx', this.props.web3Store.invokeContractTransactionHashLink)}
                                   target='_blank'>{item.transactionHash}</a>
                            </List.Item>
                        ))}
                    </List>
                </Card.Content>
            </Card>
        )
    }

}

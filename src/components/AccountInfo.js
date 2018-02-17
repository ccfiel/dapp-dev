import React from 'react'
import {Card, Label, List, Table, Button} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class AccountInfo extends React.Component {
    handleGetAccounts = () => {
        this.props.web3Store.doGetAccounts()
    }

    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Accounts</Card.Header>
                    <List divided selection>
                        <List.Item>
                            <Label color='green' horizontal>Count</Label>
                            {this.props.web3Store.accountCount}
                        </List.Item>
                        <List.Item>
                            <Label color='purple' horizontal>Coinbase</Label>
                            {this.props.web3Store.coinBase}
                        </List.Item>
                        <List.Item>
                            <Label color='yellow' horizontal>Default A/C</Label>
                            {this.props.web3Store.defaultAccount}
                        </List.Item>
                    </List>
                    <Button primary onClick={this.handleGetAccounts}>Get Accounts</Button>

                </Card.Content>
                <Card.Content>
                    <Table color="purple" key="accounts">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>Public Key</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.props.web3Store.accountsList.map((item, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <Table.Cell>{item}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
        )
    }
}

import React from 'react'
import {Card, Table} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react'
import {cardStyle} from './CommonStyle'


const cellStyle = {
    "fontSize": '12.5px'
}

@inject('web3Store')
@observer
export default class AccountBalances extends React.Component {
    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Balances</Card.Header>
                    <Card.Meta>
                        <Table color="green" key="accounts">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>#</Table.HeaderCell>
                                    <Table.HeaderCell>Balance</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.props.web3Store.accountBalancesList.map((item, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell style={cellStyle}>{index + 1}</Table.Cell>
                                        <Table.Cell style={cellStyle}>{item}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>

                    </Card.Meta>
                </Card.Content>
            </Card>
        )
    }
}

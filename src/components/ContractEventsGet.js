import React from 'react'
import {Card, Button} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class ContractEventsGet extends React.Component {

    handleClickGet = (event) => {
        this.props.web3Store.doContractEventGet()
    }
    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Contract Instance Get</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Button color='green' onClick={this.handleClickGet}>event.Get()</Button>
                </Card.Content>

            </Card>
        )
    }
}

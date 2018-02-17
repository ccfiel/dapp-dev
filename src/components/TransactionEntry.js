import React from 'react'
import {Card, Input, Select, Form, Button} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle, formStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class TransactionEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            to: '',
            from: '',
            valueEther: '0.01',
            gas: 'default',
            gasPrice: 'default',
            data: 'default',
            nonce: 'default',
        }

    }

    handleChangeAccount = (event, data) => {
        this.setState({[data.name]: data.value})
    }

    handleChangeInput = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClickJson = (event) => {
        this.props.web3Store.generateTransactionJSON(this.state)
    }

    handleClickReset = (event) => {
        this.setState({
            to: '',
            from: '',
            valueEther: '0.01',
            gas: 'default',
            gasPrice: 'default',
            data: 'default',
            nonce: 'default',
        })
    }

    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Transaction Entry</Card.Header>
                    <Form style={formStyle}>
                        <Form.Group widths='equal'>
                            <Form.Field control={Select} label='From' name='from' onChange={this.handleChangeAccount}
                                        options={this.props.web3Store.accountsToOptions} value={this.state.from}/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field control={Select} label='To' name='to' onChange={this.handleChangeAccount}
                                        options={this.props.web3Store.accountsToOptions} value={this.state.to}/>
                        </Form.Group>
                        <Form.Field control={Input} label='Value (Ether)' name='valueEther' value={this.state.valueEther} onChange={this.handleChangeInput}/>
                        <Form.Field control={Input} label='Gas' name='gas' value={this.state.gas} onChange={this.handleChangeInput}/>
                        <Form.Field control={Input} label='Gas Price (Wei)' name='gasPrice' value={this.state.gasPrice} onChange={this.handleChangeInput}/>
                        <Form.Field control={Input} label='Data (ascii)' name='data' value={this.state.data} onChange={this.handleChangeInput}/>
                        <Form.Field control={Input} label='Nonce' name='nonce' value={this.state.nonce} onChange={this.handleChangeInput}/>
                    </Form>
                </Card.Content>
                <Card.Content>
                    <Button color='green' onClick={this.handleClickJson}>JSON</Button>
                    <Button color='red' onClick={this.handleClickReset}>Reset</Button>
                </Card.Content>
            </Card>
        )
    }
}

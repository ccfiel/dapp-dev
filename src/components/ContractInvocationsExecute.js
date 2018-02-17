import React from 'react'
import {Card, Form, Message, Select, Input, Button} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle, formStyle} from './CommonStyle'

const contractFunctions = [{ key: 'getNum', value: 'getNum', text: 'getNum()'}, { key: 'setNum', value: 'setNum', text: 'setNum()'}]


@inject('web3Store')
@observer
export default class ContractInvocationsExecute extends React.Component {

    handleChangeFunction = (event, data) => {
        this.props.web3Store.contractSelectFunction = data.value
    }

    handleChangeInput = (event, data) => {
        this.props.web3Store[data.name] = data.value
    }

    handleClickCall = (event) => {
        this.props.web3Store.doContractFunctionCall()
    }

    handleClickSend = (event) => {
        this.props.web3Store.doContractSendCall()
    }

    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Execute</Card.Header>
                    <Message info>
                        <p>Address & ABIDefinition picked from deployed contract</p>
                    </Message>
                    <Form style={formStyle}>
                        <Form.Group widths='equal'>
                            <Form.Field control={Select} label='Function' name='contractSelectFunction' onChange={this.handleChangeFunction}
                                        options={contractFunctions} value={this.props.web3Store.contractSelectFunction}/>
                        </Form.Group>
                        <Form.Field control={Input} label='Parameter for setNum()' name='setNumParameter' value={this.props.web3Store.setNumParameter} onChange={this.handleChangeInput}/>
                        <Form.Field control={Input} label='Estimated Gas' name='contractExecuteEstimatedGas' value={this.props.web3Store.contractExecuteEstimatedGas} onChange={this.handleChangeInput}/>
                        <Form.Field control={Input} label='Value (Ether)' name='invocationSendValueInEther' value={this.props.web3Store.invocationSendValueInEther} onChange={this.handleChangeInput}/>
                    </Form>
                </Card.Content>
                <Card.Content>
                    <Button color='green' onClick={this.handleClickCall}>Call</Button>
                    <Button color='red' onClick={this.handleClickSend}>Send</Button>
                </Card.Content>

            </Card>
        )
    }
}

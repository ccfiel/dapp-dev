import React from 'react'
import {Card, TextArea, Form, Button, Input} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle, formStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class DeployContract extends React.Component {

    handleChangeInput = (event, data) => {
        this.props.web3Store[data.name] = data.value
    }

    handleClickDeployContract = (event, data) => {
        this.props.web3Store.doDeployContract()
    }
    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Deploy</Card.Header>
                    <Form style={formStyle}>
                        <Form.Group widths='equal'>
                            <Form.Field control={TextArea} label='ByteCode' value={this.props.web3Store.contractByteCode} name='contractByteCode' onChange={this.handleChangeInput} />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field control={TextArea} label='ABI Definitions' value={this.props.web3Store.contractABI} name='contractABI' onChange={this.handleChangeInput}/>
                        </Form.Group>
                        <Form.Field control={Input} label='Gas (Wei)' value={this.props.web3Store.contractDeployGas} name='contractDeployGas' onChange={this.handleChangeInput} />
                    </Form>
                </Card.Content>
                <Card.Content>
                    <Button color='green' onClick={this.handleClickDeployContract}>Deploy Contract</Button>
                </Card.Content>
            </Card>
        )
    }
}

import React from 'react'
import {Card, Input, Form, TextArea, Button} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle, formStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class EventLogFilter extends React.Component {

    handleChangeInput = (event, data) => {
        this.props.web3Store[data.name] = data.value
    }

    handleClickOption = (event) => {
        this.props.web3Store.generateFilterOptions()
    }

    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Filter</Card.Header>
                    <Form style={formStyle}>
                        <Form.Field control={Input} label='From Block' name='fromBlock'
                                    value={this.props.web3Store.fromBlock} onChange={this.handleChangeInput}/>
                        <Form.Field control={Input} label='To Block' name='toBlock' value={this.props.web3Store.toBlock}
                                    onChange={this.handleChangeInput}/>
                        <Form.Group widths='equal'>
                            <Form.Field control={TextArea} label='Contract Addresses'
                                        value={this.props.web3Store.contractAddressList} name='contractAddressList'
                                        onChange={this.handleChangeInput}/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field control={TextArea} label='Topics [0=event sig,1=addr,2 & 3=32byteHex]' value={this.props.web3Store.topics}
                                        name='topics' onChange={this.handleChangeInput}/>
                        </Form.Group>
                    </Form>
                </Card.Content>
                <Card.Content>
                    <Button color='green' onClick={this.handleClickOption}>Generate Filter Option</Button>
                </Card.Content>

            </Card>
        )
    }
}

import React from 'react'
import {Card, Input, TextArea,Form, Button} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle, formStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class ContractEventsWatch extends React.Component {
    handleChangeInput = (event, data) => {
        this.props.web3Store[data.name] = data.value
    }

    handleClickWatch = (event) => {
        this.props.web3Store.doContractEventWatchStart()
    }

    handleClickStopWatch = (event) => {
        this.props.web3Store.doContractEventWatchStop()
    }

    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Watch Instance Events</Card.Header>
                    <Form style={formStyle}>
                        <Form.Field control={Input} label='Contract Instance Address (abiDefinition picked from "compile" section)' name='contractInstanceAddress'
                                    value={this.props.web3Store.contractInstanceAddress} onChange={this.handleChangeInput}/>
                        <Form.Group widths='equal'>
                            <Form.Field control={TextArea} label='Indexed return values (JSON)'
                                        value={this.props.web3Store.indexedEventValues} name='indexedEventValues'
                                        onChange={this.handleChangeInput}/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field control={TextArea} label='Additional Filters' value={this.props.web3Store.additionalFilterOptions}
                                        name='additionalFilterOptions' onChange={this.handleChangeInput}/>
                        </Form.Group>
                    </Form>
                </Card.Content>
                <Card.Content>
                    <Button color='green' onClick={this.handleClickWatch}>event.watch()</Button>
                    <Button color='red' onClick={this.handleClickStopWatch}>event.stopWatch()</Button>
                </Card.Content>

            </Card>

        )
    }
}

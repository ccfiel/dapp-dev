import React from 'react'
import {Card, Form, Select, Button, Input} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle, formStyle} from './CommonStyle'

@inject('web3Store')
@observer
export default class AccountUnlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            password: ''
        }
    }

    handleChangePassword = (event) => {
        this.setState({password: event.target.value})
    }

    handleChangeAccount = (event, data) => {
        this.setState({account: data.value})
    }

    handleUnlockAccount = (event) => {
        this.props.web3Store.doUnlockAccount(this.state.account, this.state.password)
    }

    handleLockAccount = (event) => {
        this.props.web3Store.doLockAccount(this.state.account)
    }

    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Unlock Account</Card.Header>
                    <Form style={formStyle}>
                        <Form.Group widths='equal'>
                            <Form.Field control={Select} label='To' onChange={this.handleChangeAccount} options={this.props.web3Store.accountsToOptions} />
                        </Form.Group>
                        <Form.Field control={Input} label='Password' type='password' value={this.state.password} onChange={this.handleChangePassword}/>
                    </Form>
                </Card.Content>
                <Card.Content extra>
                    <Button color='green' onClick={this.handleUnlockAccount}>UnLock Account</Button>
                    <Button color='red' onClick={this.handleLockAccount}>Lock Account</Button>
                </Card.Content>
            </Card>
        )
    }
}

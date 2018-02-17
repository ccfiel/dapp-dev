import React from 'react'
import {Card} from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {cardStyle} from './CommonStyle'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';


@inject('web3Store')
@observer
export default class EventLogOption extends React.Component {
    render() {
        return (
            <Card style={cardStyle}>
                <Card.Content>
                    <Card.Header>Option</Card.Header>
                    <Card.Meta>
                        <SyntaxHighlighter language='json' style={docco}>{this.props.web3Store.optionsFilter}</SyntaxHighlighter>;
                    </Card.Meta>
                </Card.Content>
            </Card>
        )
    }
}

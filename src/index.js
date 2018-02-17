import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './register-service-worker'
import {Provider} from 'mobx-react'
import App from './components/App'
import Web3Store from "./stores/Web3Store"
import './index.css'

const stores = {
    web3Store: Web3Store
}

ReactDOM.render(
    <Provider {...stores}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker()

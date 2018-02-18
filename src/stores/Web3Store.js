import {observable, action, computed} from 'mobx';
import Web3 from "web3";

// Holds the base URL for etherscan.io
const etherScanBaseUrl = 'https://ropsten.etherscan.io/';

class Web3Store {
    @observable connectStatus = 'No Connected'
    @observable getPeerCount = 0
    @observable providerUrl = 'http://localhost:8545'
    @observable versionInformation = ''
    @observable nodeType = ''
    @observable accountsCount = ''
    @observable accountsList = []
    @observable accountBalancesList = []
    @observable coinBase = ''
    @observable defaultAccount = ''
    @observable lockUnlockResult = ''
    @observable sendTransactionObjectJson = ''
    @observable sendTransactionObject = undefined
    @observable sendTransactionErrorOrResult = ''
    @observable contractSelectFunction = ''
    @observable contractABI = '[{"constant":false,"inputs":[],"name":"getNum","outputs":[{"name":"n","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"setNum","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"x","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"caller","type":"address"},{"indexed":true,"name":"oldNum","type":"bytes32"},{"indexed":true,"name":"newNum","type":"bytes32"}],"name":"NumberSetEvent","type":"event"}]';
    @observable contractByteCode = '0x6060604052341561000c57fe5b604051602080610168833981016040528080519060200190919050505b806000819055505b505b610126806100426000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806367e0badb146044578063cd16ecbf146067575bfe5b3415604b57fe5b60516084565b6040518082815260200191505060405180910390f35b3415606e57fe5b60826004808035906020019091905050608f565b005b600060005490505b90565b60006000549050816000819055506000546001026000191681600102600019163373ffffffffffffffffffffffffffffffffffffffff167f108fd0bf2253f6baf35f111ba80fb5369c2e004b88e36ac8486fcee0c87e61ce60405180905060405180910390a45b50505600a165627a7a72305820b86215323334042910c2707668d7cc3c3ec760d2f5962724042482293eba5f6b0029';
    @observable contractDeployGas = 4700000
    @observable contractTransactionHash = ''
    @observable contractTransactionHashLink = ''
    @observable contractAddress = ''
    @observable contractAddressLink = ''
    @observable contractExecuteEstimatedGas = 4700000
    @observable setNumParameter = 5
    @observable invocationSendValueInEther = 0
    @observable invokeDetails = ''
    @observable invokeReturnValue = ''
    @observable returnValue = ''
    @observable invokeContractTransactionHash = ''
    @observable invokeContractTransactionHashLink = ''
    @observable contractAddressList = ''
    @observable fromBlock = 'latest'
    @observable toBlock = ''
    @observable topics = '0x108fd0bf2253f6baf35f111ba80fb5369c2e004b88e36ac8486fcee0c87e61ce\n' +
        '      null\n' +
        '      null'
    @observable optionsFilter = ''
    @observable watchEventCount = '0'
    @observable appliedWatchFilter = ''
    @observable filterWatch
    @observable filterEventCounter = 0
    @observable watchEventCount = 0
    @observable watchEventsList = []
    @observable filterEventCounter = 0
    @observable getLogsList = []
    @observable appliedLogFilter = ''
    @observable getLogCount = 0
    @observable contractEvent = ''
    @observable watchContractInstanceEventCount = 0
    @observable contractEventCounter = 0
    @observable watchContractEventsList = []
    @observable indexedEventValues = '{\n' +
        '  "newNum":"0x0000000000000000000000000000000000000000000000000000000000000005"\n' +
        '}\n'
    @observable additionalFilterOptions = '{\n' +
        '    "fromBlock":"latest"\n' +
        '}\n'
    @observable contractInstanceAddress = ''
    @observable getContractInstanceLogList = []
    @observable getContractInstanceLogCount = '0'
    @observable disableUnlockFeature = false
    @observable showReminder = false

    contractEvent = undefined
    web3 = undefined

    @action doConnect() {
        this.web3 = new Web3(new Web3.providers.HttpProvider(this.providerUrl))
        this.checkConnection()
    }

    checkConnection() {
        if (this.web3 && this.web3.isConnected()) {
            this.connectStatus = 'Connected'
            this.setWeb3Version()
            this.doGetNodeStatus()
            this.doGetAccounts()
        } else {
            this.connectStatus = 'Not Connected'
        }
    }
    @action doCheckMetaMask() {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof window.web3 !== 'undefined') {
            // Use Mist/MetaMask's provider
            this.web3 = new Web3(window.web3.currentProvider);
            this.checkConnection()
        } else {
            console.log('Injected web3 Not Found!!!')
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
            this.web3 = new Web3(new Web3.providers.HttpProvider(this.providerUrl));
        }
    }

    @action doGetNodeStatus() {
        this.web3.net.getListening((error, result) => {
            if (error) this.getPeerCount = error
            else {
                // Since connected lets get the count
                this.web3.net.getPeerCount((error, result) => {
                    if (error) {
                        this.getPeerCount = 0
                    } else {
                        this.getPeerCount = result
                    }
                });
            }
        });
    }

    @action setWeb3Version() {
        // Asynchronous version
        this.web3.version.getNode((error, result) => {
            if (error) this.versionInformation = String(error)
            else {
                this.versionInformation = result
                if (result.toLowerCase().includes('metamask')) {
                    this.nodeType = 'metamask';
                } else if (result.toLowerCase().includes('testrpc')) {
                    this.nodeType = 'testrpc';
                } else {
                    this.nodeType = 'geth';
                }
                if(this.nodeType === 'metamask' || this.nodeType === 'testrpc') {
                    this.lockUnlockResult = 'Unlock / lock ( ) not supported for ' + this.nodeType
                    this.disableUnlockFeature = true
                } else {
                    this.lockUnlockResult = '--'
                    this.disableUnlockFeature = false
                }
            }
        });
    }

    @action doGetAccounts() {
        // This is the synch call for getting the accounts
        // var accounts = web3.eth.accounts

        // Asynchronous call to get the accounts
        // result = [Array of accounts]
        // MetaMask returns 1 account in the array - that is the currently selected account
        this.web3.eth.getAccounts((error, result) => {
            if (error) {
                this.accountsCount = error
            } else {
                this.accountsCount = result.length

                // You need to have at least 1 account to proceed
                if (result.length === 0) {
                    if (this.nodeType === 'metamask') {
                        console.log('im here!!!')
                        this.showReminder = true
                        //alert('Unlock MetaMask *and* click \'Get Accounts\'');
                    }
                    return;
                }

                // Remove the list items that may already be there
                this.accountsList = []

                // Add the accounts as list items
                for (var i = 0; i < result.length; i++) {
                    this.accountsList.push(result[i])
                }

                let coinBase = this.web3.eth.coinbase;
                // trim it so as to fit in the window/UI
                if (coinBase) coinBase = coinBase.substring(0, 25) + '...'
                this.coinBase = coinBase

                // set the default accounts
                let defaultAccount = this.web3.eth.defaultAccount
                if (!defaultAccount) {
                    this.web3.eth.defaultAccount = result[0]
                    defaultAccount = '[Undef]' + result[0]
                }

                defaultAccount = defaultAccount.substring(0, 25) + '...'
                this.defaultAccount = defaultAccount
            }
            this.doGetBalances()
        });
    }

    /**
     * Get the balances of all accounts.
     */
    doGetBalances() {
        // Remove the balances if they already exist
        this.accountBalancesList = []

        // Add the balances as the list items
        for (var i = 0; i < this.accountsList.length; i++) {
            this.web3.eth.getBalance(this.accountsList[i], this.web3.eth.defaultBlock, (error, result) => {
                // Convert the balance to ethers
                let bal = this.web3.fromWei(result, 'ether').toFixed(2);
                this.accountBalancesList.push(bal)
            })
        }
    }


    /**
     * Unlocks the account
     * UNLOCK/LOCK not supported in TestRPC
     * Ignored in MetaMask
     */

    @action doUnlockAccount(account, password) {
        this.lockUnlockResult = '...'

        // synchronous flavor
        // web3.personal.unlockAccount(account, password, duration)
        // web3.personal.unlockAccount(account, password)

        this.web3.personal.unlockAccount(account, password, (error, result) => {
            if (error) {
                this.lockUnlockResult = String(error)
            } else {
                // Result = True if unlocked, else false
                let str = account.substring(0, 20) + '...Unlocked';
                if (!result) {
                    // This does not get called - since and error is returned for incorrect password :-)
                    str = 'Incorrect Password???';
                }
                this.lockUnlockResult = str
            }
        });
    }

    /**
     * Lock the account
     */
    @action doLockAccount(account) {
        this.lockUnlockResult = '...'

        //Synchronous flavor
        //web3.personal.lockAccount(account)

        this.web3.personal.lockAccount(account, (error, result) => {
            if (error) {
                this.lockUnlockResult = error
            } else {
                let str = account.substring(0, 20) + '...Locked'
                this.lockUnlockResult = str
            }
        });
    }

    /**
     * This function creates the transaction object by reading the input elements
     */
    createTransactionObjectJson = (inputs) => {
        let transObject = {};
        // get the from and to account
        transObject.from = inputs.from
        transObject.to = inputs.to
        // Get the value in ether and convert to wie
        let valueInWei = this.web3.toWei(inputs.valueEther, 'ether')
        transObject.value = valueInWei
        // set the gas and gasPrice
        if (inputs.gas !== 'default')
            transObject.gas = inputs.gas
        if (inputs.gasPrice !== 'default')
            transObject.gasPrice = inputs.gasPrice
        // set the data
        if (inputs.data !== 'default') {
            // convert the ascii to hex
            transObject.data = this.web3.toHex(inputs.data)
        }
        // set the nonce
        if (inputs.nonce !== 'default')
            transObject.nonce = inputs.nonce

        return transObject;
    }

    /**
     * Populates the JSON for transaction object
     */
    @action generateTransactionJSON(state) {
        this.sendTransactionObject = this.createTransactionObjectJson(state)
        this.sendTransactionObjectJson = JSON.stringify(this.sendTransactionObject, undefined, 2)
    }


    /**
     * This gets invoked for sending the transaction
     */

    @action doSendTransaction() {
        this.web3.eth.sendTransaction(this.sendTransactionObject, (error, result) => {
            if (error) {
                this.sendTransactionErrorOrResult = String(error)
            } else {
                this.sendTransactionErrorOrResult = result
                this.etherScanIoTxLink = this.createEtherScanIoUrl('tx', result)
            }
        });
    }

    /**
     * Create the etherscan link
     */
    @action createEtherScanIoUrl(type, hashOrNumber) {

        // For TestRPC - this URL will have no meaning as the
        // Etherscan.io will not know about the Tx Hash

        var url = etherScanBaseUrl;
        if (type === 'tx') {
            url += 'tx/' + hashOrNumber;
        } else if (type === 'block') {
            url += 'block/' + hashOrNumber;
        } else if (type === 'address') {
            url += 'address/' + hashOrNumber;
        }
        return url;
    }

    /**
     * Deploys the contract - ASYNCH
     */

    @action doDeployContract() {
        // Reset the deployment results UI

        this.contractTransactionHash = ''
        this.contractTransactionHashLink = ''
        this.contractAddress = ''
        this.contractAddressLink = ''
        let abiDefinition = JSON.parse(this.contractABI);

        // 1. Create the contract object
        let contract = this.web3.eth.contract(abiDefinition);

        // 2. Create the params for deployment - all other params are optional, uses default
        var params = {
            from: this.web3.eth.coinbase,
            data: this.contractByteCode,
            gas: this.contractDeployGas
        }

        // 3. This is where the contract gets deployed
        // Callback method gets called *2*
        // First time : Result = Txn Hash
        // Second time: Result = Contract Address
        var constructor_param = 10;

        contract.new(constructor_param, params, (error, result) => {

            if (error) {
                this.contractTransactionHash = 'Deployment Failed: ' + String(error)
            } else {
                if (result.address) {
                    this.contractAddress = result.address
                    this.contractAddressLink = this.createEtherScanIoUrl('address', result.address)
                } else {
                    // gets set in the first call
                    this.contractTransactionHash = result.transactionHash
                    this.contractTransactionHashLink = this.createEtherScanIoUrl('tx', result.transactionHash)
                }
            }
        });
    }

    // Utility method for creating the contract instance
    createContractInstance(addr) {
        let abiDefinition = JSON.parse(this.contractABI);

        // Instance uses the definition to create the function
        let contract = this.web3.eth.contract(abiDefinition);

        // THIS IS AN EXAMPLE - How to create a deploy using the contract
        // var instance = contract.new(constructor_params, {from:coinbase, gas:10000})
        // Use the next for manual deployment using the data generated
        // var contractData = contract.new.getData(constructor_params, {from:coinbase, gas:10000});
        let address = addr;

        if (!address) address = this.contractAddress

        // Instance needs the address
        let instance = contract.at(address);

        return instance;
    }

    /**
     * Sets the Result UI components for the Execute call
     */
    setExecuteResultUI(callType, functionName, parameter, returnValue, txHash, error) {
        let detail = callType + ':' + functionName + '(' + parameter + ')'
        if (error) detail += ' FAILED ' + String(error)
        else detail += 'Successful';

        this.invokeDetails = detail
        this.invokeReturnValue = String(returnValue)
        this.returnValue = String(returnValue)
        if (txHash) {
            this.invokeContractTransactionHash = txHash
            this.invokeContractTransactionHashLink = this.createEtherScanIoUrl('tx', txHash)
        } else {
            this.invokeContractTransactionHash = ''
            this.invokeContractTransactionHashLink = ''
        }
    }


    /**
     * This invokes the contract function
     * locally on the node with no state change propagation
     */
    @action doContractFunctionCall() {
        // This leads to the invocation of the method locally
        let instance = this.createContractInstance();

        if (this.contractSelectFunction === 'setNum') {
            // MetaMask does not allow synchronous call to 'call' for non-constant function
            // Change this to asynchronous :)
            let value = instance.setNum.call(this.setNumParameter);
            this.setExecuteResultUI('Call', this.contractSelectFunction, this.setNumParameter, value, '', false);
        } else {
            instance.getNum.call({}, this.web3.eth.defaultBlock, (error, result) => {
                this.setExecuteResultUI('Call', this.contractSelectFunction, '', result, '', error);
            });
        }
    }

    /**
     * send Transaction costs Gas. State changes are recorded on the chain.
     */
    @action doContractSendCall() {
        // creating the cntract instance
        let instance = this.createContractInstance();
        // read the ui elements

        //value NOT used as the contract function needs to be modified with "payable" modifier
        //var value = document.getElementById('invocation_send_value_in_ether').value;
        //value = web3.toWei(value,'ether');

        // Create the transaction object
        let txnObject = {
            from: this.web3.eth.coinbase,
            gas: this.contractExecuteEstimatedGas
        }

        if (this.contractSelectFunction === 'setNum') {
            // setNum with sendTransaction
            instance.setNum.sendTransaction(this.setNumParameter, txnObject, (error, result) => {
                if (error) {
                    this.setExecuteResultUI('Send Transaction:   ', this.contractSelectFunction, '', error, '', error);
                } else {
                    this.setExecuteResultUI('Send Transaction:   ', this.contractSelectFunction, this.setNumParameter, result, result, error);
                }
            })
        } else {
            // getNum with sendTransaction
            instance.getNum.sendTransaction(txnObject, (error, result) => {
                if (error) {
                    this.setExecuteResultUI('Send Transaction:   ', this.contractSelectFunction, '', error, '', error);
                } else {
                    this.setExecuteResultUI('Send Transaction:   ', this.contractSelectFunction, '', result, result, error);
                }
            })
        }
    }

    /**
     * Generates the filter options array & updates the UI also
     */

    @action generateFilterOptions() {

        let options = {};
        let val = this.fromBlock
        if (val && val.trim().length > 0)
            options['fromBlock'] = val
        val = this.toBlock
        if (val && val.trim().length > 0)
            options['toBlock'] = val

        val = this.contractAddressList
        // Addresses have multiple addresses separated by new line - need to be changed to comma separated
        val = val.trim();

        if (val.length > 0) {
            //val = val.replace('\n',',');
            val = val.split('\n')
            options['address'] = val
        }
        val = this.topics
        // only 3 topics allowed in options; array created with elements each in new line
        val = val.trim();

        if (val.length > 0) {
            val = val.split('\n');

            for (var i = 0; i < val.length; i++) {
                val[i] = val[i].trim()
                if (val[i] === 'null') val[i] = null;
            }
            options['topics'] = val;


        }

        this.optionsFilter = JSON.stringify(options, undefined, 2)
        return options;
    }

    /**
     * Starts the filter watch for events with options specified by the user
     */
    @action doFilterWatchStart() {
        //1. Stop the wtach if its already ON
        this.doFilterStopWatching();
        //2. Reset the UI
        this.watchEventCount = '0'

        //3. Create the filter option
        let options = this.generateFilterOptions();

        //4. Set the applied watch filter UI Input box
        this.appliedWatchFilter = JSON.stringify(options)

        //5. Create instance of the filter
        this.filterWatch = this.web3.eth.filter(options);

        //6. Now start watching
        this.filterWatch.watch((error, result) => {
            if (error) {
                console.error('Filter Watch Error: ', error);
            } else {
                this.filterEventCounter++;
                // Update the UI for the counter
                this.watchEventCount = this.filterEventCounter

                // Updates the UI with received event
                this.watchEventsList.push(result)
            }
        });
    }

    /**
     * Stop watching for events
     */

    @action doFilterStopWatching() {

        // 1. Stop watching if watching iactive
        if (this.filterWatch) {
            this.filterWatch.stopWatching();
            this.filterWatch = undefined;
        }
        // 2. Reset the UI
        this.watchEventCount = 'Not Watching'
        this.appliedWatchFilter = ''

        // 3. Remove all of the past events from the list
        this.watchEventsList = []

        // 4. reset the counter
        this.filterEventCounter = 0;
    }


    /**
     * Get the logs for the specified filter
     * Testnet sample contract address:
     */

    @action doFilterGetLogs() {

        // 1. Clear the list
        this.getLogsList = []

        // 2. Create the filter option
        let options = this.generateFilterOptions();

        // 3. Set the applied watch filter UI Input box
        this.appliedLogFilter = JSON.stringify(options)

        // 4. Create the instance of the filter
        let filterGet = this.web3.eth.filter(options);

        // 5. Invoke get on filter with the callback function
        filterGet.get((error, result) => {
            if (error) {
                this.getLogCount = 0
            } else {
                // result = array of events
                // Update UI with the data received as an array of events
                this.getLogCount = result.length
                for (var i = 0; i < result.length; i++) {
                    //console.log("Event.watch="+JSON.stringify(result[i]))
                    this.getLogsList.push(result[i])
                }
            }
        });
    }

    /**
     * To start the event watching using the contract object
     */

    @action doContractEventWatchStart() {

        if (this.contractEvent) {
            this.doContractEventWatchStop();
        }

        // Reset the UI
        this.watchContractInstanceEventCount = 0

        this.contractEvent = this.createContractEventInstance();

        this.contractEvent.watch((error, result) => {
            if (error) {
                console.error('Contract Event Error');
            } else {

                //    console.log("Event.watch="+JSON.stringify(result))
                // increment the count watch_instance_event_count
                this.contractEventCounter++;
                this.watchContractInstanceEventCount = this.contractEventCounter
                this.watchContractEventsList.push(result)
                console.log(result)
            }
        });
    }


    /**
     * To stop the event watching using the contract object
     */

    @action doContractEventWatchStop() {

        if (this.contractEvent) {
            this.contractEvent.stopWatching();
            this.contractEvent = undefined;
        }
        this.contractEventCounter = 0;
        this.watchContractEventsList = []
        this.watchContractInstanceEventCount = 0
    }

    /**
     * Utility method for creating an instance of the event
     */
    createContractEventInstance() {
        let contractInstance = this.createContractInstance(this.contractInstanceAddress);

        // geth the indexed data values JSON
        let indexed = JSON.parse(this.indexedEventValues)

        let additional = JSON.parse(this.additionalFilterOptions);
        return contractInstance.NumberSetEvent(indexed, additional);
    }

    /**
     * Gets the logs for the specific contract instance
     */

    @action doContractEventGet() {
        this.getContractInstanceLogList = []
        this.getContractInstanceLogCount = ''
        let event = this.createContractEventInstance();
        event.get((error, result) => {
            if (error) {
                this.getContractInstanceLogCount = String(error)
            } else {
                this.getContractInstanceLogCount = result.length
                for (var i = 0; i < result.length; i++) {
                    this.getContractInstanceLogList.push(result[i])
                }
            }
        });
    }


    @computed get accountCount() {
        return this.accountsList.length
    }

    @computed get accountsToOptions() {
        let options = []
        this.accountsList.map((item, index) => (
            options.push({key: index, text: item, value: item})
        ))
        return options
    }


}

export default new Web3Store();


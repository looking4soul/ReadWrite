import Web3 from 'web3'
import Vue from 'vue'

// install metamask to make web3 exsited
var localWeb3 = new Web3(web3.currentProvider)

// ReadWrite contract deployed on Ropsten Test Net
var contractAddress = '0x410120de55cf14f3b5b88aa61b0f2ce0b5dc7476'

// abi of ReadWrite contract, can be getted from Remix after compiling
var abi = [
  {
    'constant': false,
    'inputs': [
        {
            'name': 'storeParam',
            'type': 'string'
        }
    ],
    'name': 'setStore',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [
        {
            'indexed': false,
            'name': 'store',
            'type': 'string'
        }
    ],
    'name': 'Write',
    'type': 'event'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'store',
    'outputs': [
        {
            'name': '',
            'type': 'string'
        }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }
]

var contract = new localWeb3.eth.Contract(
  abi, 
  contractAddress
)

// address of your account on metamask
var callingAddress = '0x5a4800843eeDB8a42F2D0cD572b358Bd76A258E1'

var app = new Vue({
  el: '#app',
  data: {
    store: '',
    input: '',
    show: false,
    txHash: '',
    buttonDisabled: false
  },
  mounted () {
    this.getStore()
  },
  methods: {
    getStore () {
      console.log('getStore called')
      var store = contract.methods.store()
      store.call({from: callingAddress}).then((receipt) => {
        console.log('getStore receipt', receipt)
        this.store = receipt
      }).catch((error) => {
        this.store = 'get store failed'
      });
    },
    setStore () {
      this.txHash = ''
      this.show = false

      var that = this
      var setStore = contract.methods.setStore(this.input)
      setStore.send({from: callingAddress})
      .on('transactionHash', function(hash){
        // called when tx is sent
        console.log('hash', hash)
        that.txHash = hash
        that.show = true
        that.buttonDisabled = true
      })
      .on('receipt', function(receipt){
        // called when tx is confirmed by miner
        console.log('set store receipt', receipt)
        that.getStore()
        that.buttonDisabled = false
      })
      .on('confirmation', function(confirmationNumber, receipt){
          // called every time tx is confirmed, from 0 to 24 
          // console.log('confirmation', confirmationNumber, receipt)
      })
      .on('error', (error) => {
          console.log('error', error)
          that.buttonDisabled = false
      })
    },
    watchWriteEvent () {
      // Note!!! The current provider doesn't support subscriptions: MetamaskInpageProvider
      var subscription = localWeb3.eth.subscribe('logs', {
        address: contractAddress
      }, function(error, result){
          console.log('subscription callback', error, result)
      })
      .on('data', function(log){
        console.log('data', log)
      })
      .on('changed', function(log){
        console.log('changed', log)
      })
      console.log('subscription', subscription)
    }
  }
});
import {HardhatUserConfig} from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'hardhat-contract-sizer'
import 'solidity-coverage'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-contract-sizer'
import 'hardhat-gas-reporter'
import '@nomiclabs/hardhat-solhint'

const memonic = 'test test test test test test test test test test test junk'

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200000,
      },
    },
  },
  paths: {
    sources: 'src',
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: memonic,
        accountsBalance: '100000000000000000000000000000',
      },
      blockGasLimit: 60000000,
      initialBaseFeePerGas: 0,
    },
  },
  gasReporter: {
    enabled: true,
    gasPrice: 1,
    token: 'ETH',
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
}

export default config

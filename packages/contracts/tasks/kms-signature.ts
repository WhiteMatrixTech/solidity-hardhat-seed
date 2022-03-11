import '@nomiclabs/hardhat-ethers';
import {task} from 'hardhat/config';
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import * as utils from './utils';
import {Greeter, Greeter__factory} from './../typechain';
import {PayableOverrides} from '@ethersproject/contracts';
import {kms} from '@white-matrix/hardhat-kms-signer/dist/kms';
const taskName = 'kms:signature';

task(taskName, 'Deploy Greeter')
  .addParam('greeting', 'The Greet contract to greet')
  .addParam('waitNum', 'The waitNum to transaction')
  .setAction(async (args, hre: HardhatRuntimeEnvironment) => {
    utils.log.info(await hre.getChainId());
    utils.log.info(await hre.getNamedAccounts());
    const greeting = parseInt(args['greeting']);
    const waitNum = parseInt(args['waitNum']);
    const GreeterContract = 'Greeter';
    const txConfig: PayableOverrides = {};
    if (args['gasPrice']) {
      txConfig.gasPrice = hre.ethers.utils.parseUnits(args['gasPrice'], 'gwei');
    }

    const ethersExecutionManager = new utils.EthersExecutionManager(
      `${utils.LOCK_DIR}/${taskName}.lock`,
      utils.RETRY_NUMBER,
      waitNum
    );
    await ethersExecutionManager.load();
    const GreeterFactory = await hre.ethers.getContractFactory(GreeterContract);
    const deployGreeterResult = await ethersExecutionManager.transaction(
      GreeterFactory.deploy.bind(GreeterFactory),
      [greeting],
      ['contractAddress', 'blockNumber'],
      'deploy Greeter',
      txConfig
    );
    const GreeterProxyAddress = await deployGreeterResult.contractAddress;
    const GreeterFromBlock = deployGreeterResult.blockNumber;
    utils.log.info(
      `Greeter deployed proxy at ${GreeterProxyAddress},impl at ${GreeterProxyAddress},blocknumber ${GreeterFromBlock}`
    );
  });

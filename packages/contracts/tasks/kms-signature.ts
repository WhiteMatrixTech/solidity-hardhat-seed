import '@nomiclabs/hardhat-ethers';
import {task} from 'hardhat/config';
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import * as utils from './utils';

const taskName = 'kms:signature';

task(taskName, 'Deploy micrOmega').setAction(
  async (args, hre: HardhatRuntimeEnvironment) => {
    utils.log.info(await hre.getChainId());
    utils.log.info(await hre.getNamedAccounts());
  }
);

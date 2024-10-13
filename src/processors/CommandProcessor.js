import fs from 'fs';
import path from 'path';
import { COMMANDS } from '#constants/commands';
import ERRORS from '#constants/errors';
import CdCommand from '#commands/fileSystem/Cd';
import UpCommand from '#commands/fileSystem/Up';
import LsCommand from '#commands/fileSystem/Ls';
import CatCommand from '#commands/file/Cat';
import AddCommand from '#commands/file/Add';
import RnCommand from '#commands/file/Rn';
import CpCommand from '#commands/file/Cp';
import MvCommand from '#commands/file/Mv';
import RmCommand from '#commands/file/Rm';
import OsCommand from '#commands/system/Os';
import CompressCommand from '#commands/file/Compress';
import { printError } from '#utils/printMessage';

class CommandProcessor {
    constructor(fileManager) {
        this.fileManager = fileManager;
        this.commands = {
            [COMMANDS.UP]: new UpCommand(fileManager),
            [COMMANDS.CD]: new CdCommand(fileManager),
            [COMMANDS.LS]: new LsCommand(fileManager),
            [COMMANDS.CAT]: new CatCommand(fileManager),
            [COMMANDS.ADD]: new AddCommand(fileManager),
            [COMMANDS.RN]: new RnCommand(fileManager),
            [COMMANDS.CP]: new CpCommand(fileManager),
            [COMMANDS.MV]: new MvCommand(fileManager),
            [COMMANDS.RM]: new RmCommand(fileManager),
            [COMMANDS.OS]: new OsCommand(fileManager),
            [COMMANDS.COMPRESS]: new CompressCommand(fileManager),
        };
    }

    async process(input) {
        const args = await this.#parseArguments(input);
        const [command, ...commandArgs] = args;

        if (command === COMMANDS.EXIT) {
            this.fileManager.exit();
            return;
        }

        const commandInstance = this.commands[command];
        if (!commandInstance) {
            throw new Error(ERRORS.INVALID_COMMAND);
        }

        try {
            await commandInstance.execute(commandArgs);
        } catch (error) {
            printError(`Operation failed: ${error.message}`);
        }
    }

    async #parseArguments(input) {
        const splitArgs = input.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
        const args = splitArgs.map(arg => arg.replace(/^"|"$/g, ''));

        const processedArgs = [];
        let currentPath = '';

        for (const arg of args) {
            if (currentPath || arg.includes(path.sep) || arg.includes(path.posix.sep)) {
                currentPath += (currentPath ? ' ' : '') + arg;
                try {
                    await fs.promises.access(path.resolve(this.fileManager.currentDir, currentPath));
                    processedArgs.push(currentPath);
                    currentPath = '';
                } catch (error) { }
            } else {
                processedArgs.push(arg);
            }
        }

        if (currentPath) processedArgs.push(currentPath);

        return processedArgs.map(arg => {
            const normalized = path.normalize(arg);
            return process.platform === 'win32' ? normalized.replace(/\//g, '\\') : normalized;
        });
    }
}

export default CommandProcessor;
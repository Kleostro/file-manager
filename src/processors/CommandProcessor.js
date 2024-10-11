import COMMANDS from '#constants/commands';
import ERRORS from '#constants/errors';
import CdCommand from '#commands/fileSystem/Cd';
import UpCommand from '#commands/fileSystem/Up';
import LsCommand from '#commands/fileSystem/Ls';
import CatCommand from '#commands/file/Cat';
import AddCommand from '#commands/file/Add';
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
        };
    }

    async process(input) {
        const [command, ...args] = input.split(' ');

        if (command === COMMANDS.EXIT) {
            this.fileManager.exit();
            return;
        }

        const commandInstance = this.commands[command];
        if (!commandInstance) {
            throw new Error(ERRORS.INVALID_COMMAND);
        }

        try {
            await commandInstance.execute(args);
        } catch (error) {
            printError(`Operation failed: ${error.message}`);
        }
    }
}

export default CommandProcessor;
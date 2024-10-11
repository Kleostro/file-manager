import BaseCommand from '#commands/BaseCommand';
import ERRORS from '#constants/errors';
import { printSuccess } from '#utils/printMessage';
import fs from 'fs';
import path from 'path';

class AddCommand extends BaseCommand {
    async execute(args) {
        if (args.length < 1) throw new Error(ERRORS.ADD_COMMAND_REQUIRES_ARGUMENT);
        const filePath = path.join(this.fileManager.currentDir, args[0]);
        await fs.promises.appendFile(filePath, '');
        printSuccess(`File ${args[0]} was successfully created!`);
    }
}

export default AddCommand;
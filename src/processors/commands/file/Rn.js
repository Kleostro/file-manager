import BaseCommand from '#commands/BaseCommand';
import ERRORS from '#constants/errors';
import { printSuccess } from '#utils/printMessage';
import fs from 'fs';
import path from 'path';

class RnCommand extends BaseCommand {
    async execute(args) {
        if (args.length < 2) throw new Error(ERRORS.RN_COMMAND_REQUIRES_TWO_ARGUMENTS);

        const [oldPath, newFilename] = args;
        const oldFilePath = path.resolve(this.fileManager.currentDir, oldPath);
        const dirPath = path.dirname(oldPath);
        const newPath = path.join(dirPath, newFilename);
        await fs.promises.rename(oldFilePath, newPath);
        printSuccess(`File ${path.basename(oldPath)} was renamed to ${newFilename}`);
    }
}

export default RnCommand;
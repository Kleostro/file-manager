import BaseCommand from '#commands/BaseCommand';
import ERRORS from '#constants/errors';
import fs from 'fs';
import path from 'path';
import { printSuccess } from '#utils/printMessage';
import { pipeline } from 'stream/promises';

class CpCommand extends BaseCommand {
    async execute(args) {
        if (args.length < 2) throw new Error(ERRORS.CP_COMMAND_REQUIRES_TWO_ARGUMENTS);

        const [sourcePath, destinationDir] = args;
        const sourceFile = path.resolve(this.fileManager.currentDir, sourcePath);
        const destPath = path.resolve(this.fileManager.currentDir, destinationDir, path.basename(sourceFile));

        await pipeline(
            fs.createReadStream(sourceFile),
            fs.createWriteStream(destPath)
        );

        printSuccess(`File ${path.basename(sourceFile)} was copied to ${destPath}`);
    }
}

export default CpCommand;
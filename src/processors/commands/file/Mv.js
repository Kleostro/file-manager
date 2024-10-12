import BaseCommand from '#commands/BaseCommand';
import ERRORS from '#constants/errors';
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import { printSuccess } from '#utils/printMessage';

class MvCommand extends BaseCommand {
    async execute(args) {
        if (args.length < 2) throw new Error(ERRORS.MV_COMMAND_REQUIRES_TWO_ARGUMENTS);

        const [sourcePath, destinationDir] = args;
        const fullSourcePath = path.resolve(this.fileManager.currentDir, sourcePath);
        const fullDestinationDir = path.resolve(this.fileManager.currentDir, destinationDir);

        const sourceFileName = path.basename(fullSourcePath);
        const fullDestinationPath = path.join(fullDestinationDir, sourceFileName);

        await this.#moveFile(fullSourcePath, fullDestinationPath);

        printSuccess(`File moved successfully to ${fullDestinationPath}`);
    }

    async #moveFile(sourcePath, destinationPath) {
        await fs.promises.mkdir(path.dirname(destinationPath), { recursive: true });

        const readStream = fs.createReadStream(sourcePath);
        const writeStream = fs.createWriteStream(destinationPath);

        try {
            await pipeline(readStream, writeStream);
            await fs.promises.unlink(sourcePath);
        } catch (error) {
            throw new Error(`Failed to move file: ${error.message}`);
        }
    }
}

export default MvCommand;
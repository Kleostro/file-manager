import BaseCommand from '#commands/BaseCommand';
import ERRORS from '#constants/errors';
import path from 'path';
import { pipeline } from 'stream/promises';
import fs from 'fs';
import { createBrotliCompress } from 'zlib';
import { printSuccess } from '#utils/printMessage';

class CompressCommand extends BaseCommand {
    async execute(args) {
        if (args.length < 2) throw new Error(ERRORS.COMPRESS_COMMAND_REQUIRES_TWO_ARGUMENTS);

        const [sourcePath, destinationPath] = args;
        const sourceFilePath = path.resolve(this.fileManager.currentDir, sourcePath);
        let destinationFilePath = path.resolve(this.fileManager.currentDir, destinationPath);

        try {
            const [sourceStats, destStats] = await Promise.all([
                fs.promises.stat(sourceFilePath),
                fs.promises.stat(destinationFilePath)
            ]);

            if (!sourceStats.isFile()) throw new Error(`Source is not a file: ${sourcePath}`);

            if (destStats?.isDirectory()) {
                destinationFilePath = path.join(destinationFilePath, `${path.basename(sourceFilePath)}.br`);
            } else if (path.extname(destinationFilePath) !== '.br') {
                destinationFilePath += '.br';
            }

            await pipeline(
                fs.createReadStream(sourceFilePath),
                createBrotliCompress(),
                fs.createWriteStream(destinationFilePath)
            );
            printSuccess(`File ${path.basename(sourceFilePath)} has been compressed to ${path.basename(destinationFilePath)}!`);
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error(`File not found: ${sourcePath}`);
            }
            throw error;
        }
    }
}

export default CompressCommand;
import BaseCommand from '#commands/BaseCommand';
import fs from 'fs';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'path';
import ERRORS from '#constants/errors';
import { printSuccess } from '#utils/printMessage';

class DecompressCommand extends BaseCommand {
    async execute(args) {
        if (args.length < 2) throw new Error(ERRORS.DECOMPRESS_COMMAND_REQUIRES_TWO_ARGUMENTS);

        const [sourcePath, destinationPath] = args;
        const sourceFilePath = path.resolve(this.fileManager.currentDir, sourcePath);
        let destinationFilePath = path.resolve(this.fileManager.currentDir, destinationPath);

        try {
            const sourceStats = await fs.promises.stat(sourceFilePath);
            if (!sourceStats.isFile()) {
                throw new Error(`Source is not a file: ${sourcePath}`);
            }

            const destStats = await fs.promises.stat(destinationFilePath).catch(() => null);
            if (destStats && destStats.isDirectory()) {
                const sourceFileName = path.basename(sourceFilePath, '.br');
                destinationFilePath = path.join(destinationFilePath, sourceFileName);
            } else if (path.extname(destinationFilePath) === '.br') {
                destinationFilePath = destinationFilePath.slice(0, -3);
            }

            await pipeline(
                fs.createReadStream(sourceFilePath),
                createBrotliDecompress(),
                fs.createWriteStream(destinationFilePath)
            );

            printSuccess(`File ${path.basename(sourceFilePath)} has been decompressed to ${path.basename(destinationFilePath)}!`);

            await fs.promises.unlink(sourceFilePath);
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error(`File not found: ${sourcePath}`);
            }
            throw error;
        }
    }
}

export default DecompressCommand;
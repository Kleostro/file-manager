import BaseCommand from '#commands/BaseCommand';
import fs from 'fs';
import path from 'path';
import ERRORS from '#constants/errors';
import { printSuccess } from '#utils/printMessage';

class CatCommand extends BaseCommand {
    async execute(args) {
        if (args.length < 1) throw new Error(ERRORS.CAT_COMMAND_REQUIRES_ARGUMENT);
        const filePath = path.resolve(this.fileManager.currentDir, args[0]);

        try {
            await fs.promises.access(filePath, fs.promises.constants.R_OK);
        } catch (err) {
            throw new Error(ERRORS.FILE_NOT_FOUND);
        }

        const readStream = fs.createReadStream(filePath);

        return new Promise((resolve, reject) => {
            readStream.on('data', (chunk) => {
                if (!process.stdout.write(chunk)) {
                    readStream.pause();
                }
            });

            readStream.on('end', () => {
                process.stdout.write('\n');
                printSuccess('File content was printed!');
                resolve();
            });
            readStream.on('error', (err) => reject(err));
        });
    }
}

export default CatCommand;
import path from 'path';
import fs from 'fs';
import BaseCommand from '#commands/BaseCommand';
import ERRORS from '#constants/errors';
import { printSuccess } from '#utils/printMessage';

class CdCommand extends BaseCommand {
    async execute(args) {
        if (args.length < 1) throw new Error(ERRORS.CD_COMMAND_REQUIRES_ARGUMENT);

        const newPath = args[0];
        const fullPath = path.resolve(this.fileManager.currentDir, newPath);

        try {
            await fs.promises.access(fullPath);
            const stats = await fs.promises.stat(fullPath);

            if (!stats.isDirectory()) {
                throw new Error(ERRORS.NOT_A_DIRECTORY);
            }

            this.fileManager.currentDir = fullPath;
            printSuccess(`Changed directory to ${fullPath}`);
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error(ERRORS.DIRECTORY_DOES_NOT_EXIST);
            }
            throw error;
        }
    }
}

export default CdCommand;
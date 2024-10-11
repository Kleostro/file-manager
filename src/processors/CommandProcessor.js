import COMMANDS from '#constants/commands';
import ERRORS from '#constants/errors';
import path from 'path';
import fs from 'fs';
import { printSuccess } from '#utils/printMessage';

class CommandProcessor {
    constructor(fileManager) {
        this.fileManager = fileManager;
    }

    async process(input) {
        const [command, ...args] = input.split(' ');

        switch (command) {
            case COMMANDS.UP:
                this.#up();
                break;
            case COMMANDS.CD:
                if (args.length < 1) throw new Error(ERRORS.CD_COMMAND_REQUIRES_ARGUMENT);
                await this.#cd(args[0]);
                break;
            case COMMANDS.EXIT:
                this.fileManager.exit();
                break;
            default:
                throw new Error(ERRORS.INVALID_COMMAND);
        }
    }

    #up() {
        this.fileManager.currentDir = path.dirname(this.fileManager.currentDir);
    }

    async #cd(newPath) {
        const fullPath = path.resolve(this.fileManager.currentDir, newPath);

        try {
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

export default CommandProcessor;
import COMMANDS from '#constants/commands';
import ERRORS from '#constants/errors';
import path from 'path';

class CommandProcessor {
    constructor(fileManager) {
        this.fileManager = fileManager;
    }

    process(input) {
        const [command] = input.split(' ');

        switch (command) {
            case COMMANDS.UP:
                this.#up();
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
}

export default CommandProcessor;
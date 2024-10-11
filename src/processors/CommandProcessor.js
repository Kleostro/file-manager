import COMMANDS from '#constants/commands';
import ERRORS from '#constants/errors';

class CommandProcessor {
    constructor(fileManager) {
        this.fileManager = fileManager;
    }

    process(input) {
        const [command] = input.split(' ');

        switch (command) {
            case COMMANDS.EXIT:
                this.fileManager.exit();
                break;
            default:
                throw new Error(ERRORS.INVALID_COMMAND);
        }
    }
}

export default CommandProcessor;
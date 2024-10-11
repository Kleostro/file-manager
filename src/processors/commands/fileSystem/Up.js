import BaseCommand from '#commands/BaseCommand';
import { printSuccess } from '#utils/printMessage';
import path from 'path';

class UpCommand extends BaseCommand {
    async execute() {
        this.fileManager.currentDir = path.dirname(this.fileManager.currentDir);
        printSuccess(`Changed directory to ${this.fileManager.currentDir}`);
    }
}

export default UpCommand;
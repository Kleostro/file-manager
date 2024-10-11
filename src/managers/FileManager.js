import readline from 'readline';
import os from 'os';
import getUsernameFromArgs from '#utils/getUsernameFromArgs';
import { printInfo } from '#utils/printMessage';

class FileManager {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.currentDir = os.homedir();
        this.username = getUsernameFromArgs();
    }

    start() {
        printInfo(`Welcome to the File Manager, ${this.username}!`);
    }
}

export default FileManager;
import readline from 'readline';
import os from 'os';
import getUsernameFromArgs from '#utils/getUsernameFromArgs';
import { printInfo, printError } from '#utils/printMessage';
import CommandProcessor from '#processors/CommandProcessor';

class FileManager {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.rl.on('close', () => this.exit());

        this.currentDir = os.homedir();
        this.username = getUsernameFromArgs();

        this.commandProcessor = new CommandProcessor(this);
    }

    #promptUser() {
        this.rl.question('Enter command: \n', (input) => this.#processCommand(input.trim()));
    }

    #processCommand(input) {
        try {
            this.commandProcessor.process(input);
        } catch (error) {
            printError(`Operation failed: ${error.message}`);
        }

        this.#promptUser();
    }

    start() {
        printInfo(`Welcome to the File Manager, ${this.username}!`);
        this.#promptUser();
    }

    exit() {
        this.rl.close();
        printInfo(`Thank you for using File Manager, ${this.username}, goodbye!`);
        process.exit(0);
    }
}

export default FileManager;
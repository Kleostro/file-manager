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

    start() {
        printInfo(`Welcome to the File Manager, ${this.username}!`);
        this.#printCurrentDir();
        this.#promptUser();
    }

    exit() {
        this.rl.close();
        printInfo(`Thank you for using File Manager, ${this.username}, goodbye!`);
        process.exit(0);
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

        this.#printCurrentDir();
        this.#promptUser();
    }

    #printCurrentDir() {
        printInfo(`You are currently in ${this.currentDir}`);
    }
}

export default FileManager;
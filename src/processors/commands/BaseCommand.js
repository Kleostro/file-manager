class BaseCommand {
    constructor(fileManager) {
        if (new.target === BaseCommand) {
            throw new Error('BaseCommand is an abstract class and cannot be instantiated directly');
        }

        this.fileManager = fileManager;
    }

    async execute(args) {
        throw new Error('execute method must be implemented');
    }
}

export default BaseCommand;
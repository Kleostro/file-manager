import BaseCommand from '#commands/BaseCommand';
import { printInfo, printTable } from '#utils/printMessage';
import fs from 'fs';

class LsCommand extends BaseCommand {
    async execute() {
        printInfo('List of files and directories:');
        const items = await fs.promises.readdir(this.fileManager.currentDir, { withFileTypes: true });

        const sortedItems = items
            .map(item => ({ Name: item.name, Type: item.isDirectory() ? 'directory' : 'file' }))
            .toSorted((a, b) =>
                a.Type === b.Type
                    ? a.Name.localeCompare(b.Name)
                    : a.Type === 'directory' ? -1 : 1
            );

        printTable(sortedItems, ['Name', 'Type']);
    }
}

export default LsCommand;
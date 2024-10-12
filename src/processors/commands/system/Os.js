import BaseCommand from '#commands/BaseCommand';
import os from 'os';
import ERRORS from '#constants/errors';
import { printSuccess, printInfo } from '#utils/printMessage';
import { OS_ARGUMENTS } from '#constants/commands';

class OsCommand extends BaseCommand {
    async execute(args) {
        if (args.length < 1) throw new Error(ERRORS.OS_COMMAND_REQUIRES_ARGUMENT);

        switch (args[0]) {
            case OS_ARGUMENTS.EOL:
                printSuccess(JSON.stringify(os.EOL));
                break;
            case OS_ARGUMENTS.CPUS:
                const cpus = os.cpus();
                printInfo(`Overall amount of CPUs: ${cpus.length}`);
                cpus.forEach((cpu, index) => {
                    printSuccess(`CPU ${index + 1}:`);
                    printSuccess(`  Model: ${cpu.model}`);
                    printSuccess(`  Clock rate: ${cpu.speed / 1000} GHz`);
                });
                break;
            case OS_ARGUMENTS.HOMEDIR:
                printSuccess(os.homedir());
                break;
            case OS_ARGUMENTS.USERNAME:
                printSuccess(os.userInfo().username);
                break;
            case OS_ARGUMENTS.ARCHITECTURE:
                printSuccess(os.arch());
                break;
            default:
                throw new Error(ERRORS.INVALID_OS_ARGUMENT);
        }
    }
}

export default OsCommand;
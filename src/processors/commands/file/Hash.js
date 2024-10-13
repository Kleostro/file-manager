import BaseCommand from "#commands/BaseCommand";
import ERRORS from "#constants/errors";
import { printSuccess } from "#utils/printMessage";
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

class HashCommand extends BaseCommand {

    async execute(args) {
        if (args.length < 1) throw new Error(ERRORS.HASH_COMMAND_REQUIRES_ONE_ARGUMENT);
        const fileStats = await fs.promises.stat(args[0]);
        if (!fileStats.isFile()) throw new Error(`File not found: ${args[0]}`);
        const fileContent = await fs.promises.readFile(args[0], 'utf8');
        const hash = crypto.createHash('sha256').update(fileContent).digest('hex');
        printSuccess(`Hash: ${hash}`);
    }
}

export default HashCommand;
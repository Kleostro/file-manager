import BaseCommand from "#commands/BaseCommand";
import ERRORS from "#constants/errors";
import path from "path";
import fs from "fs";
import { printSuccess } from "#utils/printMessage";

class RmCommand extends BaseCommand {
    async execute(args) {
        if (args.length < 1) throw new Error(ERRORS.RM_COMMAND_REQUIRES_ONE_ARGUMENT);

        const fullPath = path.resolve(this.fileManager.currentDir, args[0]);
        await fs.promises.unlink(fullPath);
        printSuccess(`File ${path.basename(fullPath)} deleted successfully!`);
    }
}

export default RmCommand;
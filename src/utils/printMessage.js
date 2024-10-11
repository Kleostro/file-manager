import COLORS from '#constants/colors';

const printMessage = (type) => (message) => {
    console.log(`${type}${message}\x1b[0m`);
}

export const printInfo = printMessage(COLORS.INFO);
export const printError = printMessage(COLORS.ERROR);
export const printSuccess = printMessage(COLORS.SUCCESS);
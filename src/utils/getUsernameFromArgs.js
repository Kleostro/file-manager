import os from 'os';

const getUsernameFromArgs = () => {
    const args = process.argv.slice(2);
    const usernameArg = args.find(arg => arg.startsWith('--username='));
    return usernameArg ? usernameArg.split('=')[1] : os.userInfo().username;
}

export default getUsernameFromArgs;
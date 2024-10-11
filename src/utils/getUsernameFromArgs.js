const getUsernameFromArgs = () => {
    const args = process.argv.slice(2);
    const usernameArg = args.find(arg => arg.startsWith('--username='));
    return usernameArg ? usernameArg.split('=')[1] : 'Guest';
}

export default getUsernameFromArgs;
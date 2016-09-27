const USERNAME_KEY = 'username';

export const setUsername = username => {
    global.localStorage.setItem(USERNAME_KEY, username);

    return {type: 'SET_NAME', name: username};
};

export const generateRandomUsername = () => {
    const getRandomName = () => {
        const randomUsernames = ['squirrel', 'cat', 'dog', 'horse', 'bird', 'hamster', 'snake', 'elephant', 'lion', 'panda'];

        return randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
    };

    return setUsername(getRandomName());
};

export const loadUsername = () => {
    const username = global.localStorage.getItem(USERNAME_KEY);

    return username ?
        {type: 'SET_NAME', name: username} :
        {type: ''};
};


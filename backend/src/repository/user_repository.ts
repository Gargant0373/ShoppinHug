import User from "../types/user";

const fs = require('fs');
let users: User[] = [];

function init() {
    // Check if folder exists
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
    }
    
    // Check if file exists
    if (!fs.existsSync('./data/users.json')) {
        fs.writeFileSync('./data/users.json', JSON.stringify([]));
    }
    users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
}

function getUser(name: string): User | undefined {
    return users.find(user => user.name === name);
}

function save(): void {
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
}

function addUser(name: string, password: string): number {
    let user = getUser(name);
    if (user != undefined) return 404;
    user = { name: name, password: password };
    users.push(user);
    save();
    return 200;
}

export { users, init, getUser, save, addUser };

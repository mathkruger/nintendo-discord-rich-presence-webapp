const {
    app,
    BrowserWindow
} = require('electron');
const { exec } = require("child_process");
const url = require("url");
const path = require("path");
const { api } = require("nintendo-discord-rich-presence-server/src/api");

let appWindow;
let serverProcess;

const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        stdout = stdout.replaceAll(query + " <defunct>", "");
        cb(stdout.includes(query));
    });
}

function killServer() {
    if (serverProcess) {
        serverProcess.close();
    }
}

function startServer() {
    serverProcess = api.listen(3333);
}

function initWindow() {
    appWindow = new BrowserWindow({
        width: 400,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    isRunning('Discord', (status) => {
        let fileToRender = "/dist/index.html";
        
        if (status) {
            startServer();
        }
        else {
            fileToRender = "/discord-error.html";
        }

        appWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, fileToRender),
                protocol: "file:",
                slashes: true
            })
        );
    });

    appWindow.setMenuBarVisibility(false);

    appWindow.on('closed', function () {
        appWindow = null;
    });
}

app.on('ready', initWindow);

app.on('window-all-closed', function () {
    app.quit();
    killServer();
});

app.on('activate', function () {
    if (win === null) {
        initWindow();
    }
});
const {
    app,
    BrowserWindow
} = require('electron');
const { exec } = require("child_process");
const url = require("url");
const path = require("path");

let appWindow;
let serverProcess;

function killProcess(process) {
    if (serverProcess.killed) return;

    exec("kill " + (Number.parseInt(process.pid) + 1), (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }

        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    });
}

function initWindow() {
    serverProcess = exec("node server/src/index.js &", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }

        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        console.log("Server iniciado", stdout);
    });
    
    appWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    appWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );

    appWindow.on('closed', function () {
        appWindow = null;
    });
}

app.on('ready', initWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
        killProcess(serverProcess);
    }
});

app.on('activate', function () {
    if (win === null) {
        initWindow();
    }
});
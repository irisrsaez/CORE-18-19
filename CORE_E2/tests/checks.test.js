/**
 * Corrector para la práctica de cmd
 */

// IMPORTS
const should = require('chai').should();
const path = require('path');
const fs = require('fs-extra');
const Utils = require('./utils');
const to = require('./to');
const child_process = require("child_process");
const spawn = require("child_process").spawn;

const path_assignment = path.resolve(path.join(__dirname, "../"));

// CRITICAL ERRORS
let error_critical = null;
let error_critical_prog = null;
let error_critical_ev = null;

// CONSTANTS
const JS_RUNNER = 'practica2.js';
const JS_PROGRAMMER = 'programador.js';
const JS_PROGRAMMER_CLASS = 'Programador';

const JS_EVENTS = 'events.js';
const JS_EVENTS_CLASS = 'EventEmitter';
const JS_EVENTS_CLASS_ON = 'on';
const JS_EVENTS_CLASS_EMIT = 'emit';

const T_WAIT = 2; // Time between commands
const T_TEST = 2 * 60; // Time between tests (seconds)

// HELPERS
const timeout = ms => new Promise(res => setTimeout(res, ms));

//TESTS
describe("CORE19-02_events", function () {

    this.timeout(T_TEST * 1000);

    it("", async function () {
        const expected = path_assignment;
        this.name = `1(Precheck): Checking that the assignment directory exists...`;
        this.score = 0;
        this.msg_ok = `Found the directory '${expected}'`;
        this.msg_err = `Couldn't find the directory '${expected}'`;
        const [error, output] = await to(fs.pathExists(expected));
        if (error) {
            error_critical = this.msg_err;
            should.not.exist(error_critical);
        }
        should.not.exist(error);
    });

    it("", async function () {
        const expected = 'package.json';
        this.name = `2(Precheck): Checking that the file '${expected}' exists...`;
        this.score = 0;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `Found the file '${expected}'`;
            this.msg_err = `Couldn't find the file '${expected}'`;
            const [error, output] = await to(fs.pathExists(expected));
            if (error) {
                error_critical = this.msg_err;
            }
            should.not.exist(error);
        }
    });

    it("", async function () {
        const expected = 'package.json';
        this.name = `3(Precheck): Checking that the file '${expected}' has valid syntax...`;
        this.score = 0;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `The file '${expected}' has the right format`;
            const [error, output] = await to(fs.readFile(expected, 'utf8'));
            if (error) {
                this.msg_err = `Couldn't read the file '${expected}'`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            }
            should.not.exist(error);
            const is_json = Utils.isJSON(output);
            if (!is_json) {
                this.msg_err = `The file '${expected}' doesn't have the right format`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            }
            is_json.should.be.equal(true);
        }
    });

    it("", async function () {
        const expected = 'npm install';
        this.name = `4(Precheck): Installing dependencies...`;
        this.score = 0;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = "Dependencies installed successfully";
            [error, output] = await to(new Promise((resolve, reject) => {
                child_process.exec(expected, {cwd: path_assignment}, (err, stdout) =>
                    err ? reject(err) : resolve(stdout))
            }));
            if (error) {
                this.msg_err = `Error running '${expected}': ${error}`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            }
            should.not.exist(error);
        }
    });

    it("", async function () {
        const expected = JS_PROGRAMMER;
        this.name = `5: Checking that the file '${expected}' exists...`;
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `Found the file '${expected}'`;
            this.msg_err = `Couldn't find the file '${expected}'`;
            const [error, output] = await to(fs.pathExists(path.join(path_assignment, expected)));
            if (error || !output) {
                error_critical_prog = this.msg_err;
            }
            should.not.exist(error_critical_prog);
        }
    });

    it("", async function () {
        const expected = JS_PROGRAMMER;
        this.name = `6: Checking that the file '${expected}' is valid js...`;
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            if (error_critical_prog) {
                this.msg_err = error_critical_prog;
                should.not.exist(error_critical_prog);
            } else {
                this.msg_ok = `The file '${expected}' has the right syntax`;
                [error, output] = await to(new Promise((resolve, reject) => {
                    child_process.exec(`node --check ${expected}`, (err, stdout) =>
                        err ? reject(err) : resolve(stdout))
                }));
                if (error) {
                    this.msg_err = `Error parsing the file '${expected}': ${error}`;
                    error_critical = this.msg_err;
                    should.not.exist(error_critical);
                }
                should.not.exist(error);
            }
        }
    });

    it("", async function () {
        const expected = JS_PROGRAMMER_CLASS;
        this.name = `7: Checking that the file '${JS_PROGRAMMER}' exports the class '${expected}'......`;
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            let output = "";
            if (error_critical_prog) {
                this.msg_err = error_critical_prog;
                should.not.exist(error_critical_prog);
            } else {
                this.msg_ok = `Export class '${expected}' found in file '${JS_PROGRAMMER}'`;
                try {
                    output = require(path.join(path_assignment, JS_PROGRAMMER)).toString();
                } catch (error) {
                    this.msg_err = `Export class '${expected}' not found in file '${JS_PROGRAMMER}'\n\t\t\tError: ${error}`;
                    error.should.not.exist();
                }
                this.msg_err = `Export class '${expected}' not found in file '${JS_PROGRAMMER}'\n\t\t\tReceived: ${output}`;
                Utils.search(expected, output).should.be.equal(true);
            }
        }
    });

    it("", async function () {
            const expected = JS_EVENTS;
            this.name = `8: Checking that the file '${expected}' exists...`;
            this.score = 1;
            if (error_critical) {
                this.msg_err = error_critical;
                should.not.exist(error_critical);
            } else {
                this.msg_ok = `Found the file '${expected}'`;
                this.msg_err = `Couldn't find the file '${expected}'`;
                const [error, output] = await to(fs.pathExists(path.join(path_assignment, expected)));
                if (error || !output) {
                    error_critical_ev = this.msg_err;
                }
                should.not.exist(error_critical_ev);
            }
        }
    );

    it("", async function () {
        const expected = JS_EVENTS;
        this.name = `9: Checking that the file '${expected}' is valid js...`;
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            if (error_critical_ev) {
                this.msg_err = error_critical_ev;
                should.not.exist(error_critical_ev);
            } else {
                this.msg_ok = `The file '${expected}' has the right syntax`;
                [error, output] = await to(new Promise((resolve, reject) => {
                    child_process.exec(`node --check ${expected}`, {cwd: path_assignment}, (err, stdout) =>
                        err ? reject(err) : resolve(stdout))
                }));
                if (error) {
                    this.msg_err = `Error parsing the file '${expected}': ${error}`;
                    error_critical = this.msg_err;
                    should.not.exist(error_critical);
                }
                should.not.exist(error);
            }
        }
    });

    it("", async function () {
        const expected = JS_EVENTS_CLASS;
        this.name = `10: Checking that the file '${JS_EVENTS}' exports the class '${expected}'......`;
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            if (error_critical_ev) {
                this.msg_err = error_critical_ev;
                should.not.exist(error_critical_ev);
            } else {
                let output = "";
                this.msg_ok = `Export class '${expected}' found in file '${JS_EVENTS}'`;
                try {
                    output = require(path.join(path_assignment, JS_EVENTS)).toString();
                } catch (error) {
                    this.msg_err = `Export class '${expected}' not found in file '${JS_EVENTS}'\n\t\t\tError: ${error}`;
                    should.not.exist(error);
                }
                this.msg_err = `Export class '${expected}' not found in file '${JS_EVENTS}'\n\t\t\tReceived: ${output}`;
                Utils.search(expected, output).should.be.equal(true);
            }
        }
    });

    it("", async function () {
        const expected = JS_EVENTS_CLASS_ON;
        this.name = `11: Checking that the class '${JS_EVENTS_CLASS}' implements the method '${expected}'...`;
        this.score = 0.5;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            if (error_critical_ev) {
                this.msg_err = error_critical_ev;
                should.not.exist(error_critical_ev);
            } else {
                let output = "";
                this.msg_ok = `Method '${expected}' found in class '${JS_EVENTS_CLASS}'`;
                try {
                    output = require(path.join(path_assignment, JS_EVENTS)).toString();
                } catch (error) {
                    this.msg_err = `Method '${expected}' not found in class '${JS_EVENTS_CLASS}'\n\t\t\tError: ${error}`;
                    should.not.exist(error);
                }
                this.msg_err = `Method '${expected}' not found in class '${JS_EVENTS_CLASS}'\n\t\t\tReceived: ${output}`;
                Utils.search(expected, output).should.be.equal(true);
            }
        }
    });

    it("", async function () {
        const expected = JS_EVENTS_CLASS_ON;
        this.name = `12: Checking that the  method '${expected}' accepts the right params...`;
        this.score = 0.5;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            if (error_critical_ev) {
                this.msg_err = error_critical_ev;
                should.not.exist(error_critical_ev);
            } else {
                this.msg_ok = `Method '${expected}' accepts the right params'`;
                try {
                    const myclass = new(require(path.join(path_assignment, JS_EVENTS)));
                    myclass.on("ideal", () => {});
                } catch (error) {
                    this.msg_err = `Method '${expected}' not accepting params ["ideal", ()=>{}]\n\t\t\tError: ${error}`;
                    should.not.exist(error);
                }
                should.not.exist(error);
            }
        }
    });

    it("", async function () {
        const expected = JS_EVENTS_CLASS_EMIT;
        this.name = `13: Checking that the class '${JS_EVENTS_CLASS}' implements the method '${expected}'...`;
        this.score = 0.5;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            if (error_critical_ev) {
                this.msg_err = error_critical_ev;
                should.not.exist(error_critical_ev);
            } else {
                let output = "";
                this.msg_ok = `Method '${expected}' found in class '${JS_EVENTS_CLASS}'`;
                try {
                    output = require(path.join(path_assignment, JS_EVENTS)).toString();
                } catch (error) {
                    this.msg_err = `Method '${expected}' not found in class '${JS_EVENTS_CLASS}'\n\t\t\tError: ${error}`;
                    should.not.exist(error);
                }
                this.msg_err = `Method '${expected}' not found in class '${JS_EVENTS_CLASS}'\n\t\t\tReceived: ${output}`;
                Utils.search(expected, output).should.be.equal(true);
            }
        }
    });

    it("", async function () {
        const expected = JS_EVENTS_CLASS_EMIT;
        this.name = `14: Checking that the  method '${expected}' accepts the right params...`;
        this.score = 0.5;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            if (error_critical_ev) {
                this.msg_err = error_critical_ev;
                should.not.exist(error_critical_ev);
            } else {
                this.msg_ok = `Method '${expected}' accepts the right params'`;
                try {
                    const myclass = new(require(path.join(path_assignment, JS_EVENTS)));
                    myclass.emit("ideal", 20.0);
                } catch (error) {
                    this.msg_err = `Method '${expected}' not accepting params ["ideal", 20.0]\n\t\t\tError: ${error}`;
                    should.not.exist(error);
                }
                should.not.exist(error);
            }
        }
    });

    it("", async function () {
        const expected = "Enfriando";
        this.name = `15: Checking that the program works with the new '${JS_PROGRAMMER}' and '${JS_EVENTS}'. Running '${JS_RUNNER}'...`;
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            if (error_critical_ev) {
                this.msg_err = error_critical_ev;
                should.not.exist(error_critical_ev);
            } else {
                let output = "";
                let error = "";
                const client = spawn("node", ["./tester.js"], {cwd: path.join(path_assignment, "tests")});
                client.on('error', function (data) {
                    error += data
                });
                client.stdin.on('data', function (data) {
                    output += data
                });
                client.stdout.on('data', function (data) {
                    output += data
                });
                client.stderr.on('data', function (data) {
                    error += data
                });
                await timeout(T_WAIT * 1000);
                if (client) {
                    client.kill();
                }
                this.msg_ok = `Found '${expected}' in ${path_assignment}`;
                this.msg_err = `Couldn't find '${expected}' in ${path_assignment}\nError:${error}\nReceived:${output}`;
                error.should.be.equal("");
                Utils.search(expected, output).should.be.equal(true);
            }
        }
    });
});
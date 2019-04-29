/**
 * Corrector para la práctica de sql
 */

// IMPORTS
const should = require('chai').should();
const path = require('path');
const fs = require('fs-extra');
const Utils = require('./utils');
const to = require('./to');
const Browser = require('zombie');
const spawn = require("child_process").spawn;

// CRITICAL ERRORS
let error_critical = null;

// CONSTANTS
const T_WAIT = 2; // Time between commands
const T_TEST = 2 * 60; // Time between tests (seconds)
const browser = new Browser();
const URL = "http://localhost:8000/quizzes";
const path_assignment = path.resolve(path.join(__dirname, "../"));
const path_file = path.join(path_assignment, "CORE19-07_quiz_mvc_server.js");
const quizzes_orig = path.join(path_assignment, 'quizzes.sqlite');
const quizzes_back = path.join(path_assignment, 'quizzes.original.sqlite');
const quizzes_test = path.join(path_assignment, 'tests', 'quizzes.sqlite');

// HELPERS
const timeout = ms => new Promise(res => setTimeout(res, ms));
let server = null;

//TESTS
describe("CORE19-07_quiz_mvc_server", function () {

    this.timeout(T_TEST * 1000);

    it('', async function () {
        this.name = `1(Precheck): Checking that the assignment file exists...`;
        this.score = 0;
        this.msg_ok = `Found the file '${path_file}'`;
        this.msg_err = `Couldn't find the file '${path_file}'`;
        const [error_path, path_ok] = await to(fs.pathExists(path_file));
        if (error_path) {
            error_critical = this.msg_err;
        }
        path_ok.should.be.equal(true);
    });

    it('', async function () {
        this.name = `2(Precheck): Installing dependencies...`;
        this.score = 0;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = "Dependencies installed successfully";
            // replace answers file
            let error_deps;
            try {fs.copySync(quizzes_orig, quizzes_back, {"overwrite": true});} catch (e){}
            try {fs.copySync(quizzes_test, quizzes_orig, {"overwrite": true});} catch (e){}
            if (error_deps) {
                this.msg_err = "Error copying the answers file: " + error_deps;
                error_critical = this.msg_err;
            }
            should.not.exist(error_critical);
        }
    });

    it('', async function () {
        this.name = `3(Precheck): Launching the server...`;
        this.score = 0;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `'${path_file}' has been launched correctly`;
            server = spawn("node", [path_file], {cwd: path_assignment});
            let error_launch = "";
            server.on('error', function (data) {
                error_launch += data
            });
            server.stderr.on('data', function (data) {
                error_launch += data
            });
            await to(timeout(T_WAIT * 1000));
            this.msg_err = `Error launching '${path_file}'<<\n\t\t\tReceived: ${error_launch}`;
            if (error_launch.length) {
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            }
            error_launch.should.be.equal("");
        }
    });
    it('', async function () {
        this.name = `4: Looking for '<table>'...`;
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const expected = /table/img;
            let error_nav;
            [error_nav, resp] = await to(browser.visit(URL));
            this.msg_ok = `Found '${expected}' in ${path_assignment}`;
            this.msg_err = `Couldn't find '${expected}' in ${URL}\n\t\t\tError: >>${error_nav}<<\n\t\t\tReceived: >>${browser.html('body')}<<`;
            Utils.search(expected, browser.html('body')).should.be.equal(true);
        }
    });

    it('', async function () {
        this.name = `4: Checking 'Edit' implementation...`;
        this.score = 3;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const expected = "Question 1";
            let error_nav;
            [error_nav, resp] = await to(browser.visit(URL));
            if (error_nav) {
                this.msg_err = `Couldn't find '${expected}' in ${URL}\n\t\t\tError: >>${error_nav}<<\n\t\t\tReceived: >>${browser.html('body')}<<`;
            }
            [error_nav, resp] = await to(browser.click('a[href="/quizzes/1/edit"]'));
            if (error_nav) {
                this.msg_err = `Couldn't find '${expected}' in ${URL}\n\t\t\tError: >>${error_nav}<<\n\t\t\tReceived: >>${browser.html('body')}<<`;
            }
            [error_nav, resp] = await to(browser.fill('input[name="question"]', expected));
            if (error_nav) {
                this.msg_err = `Couldn't find '${expected}' in ${URL}\n\t\t\tError: >>${error_nav}<<\n\t\t\tReceived: >>${browser.html('body')}<<`;
            }
            [error_nav, resp] = await to(browser.fill('input[name="answer"]', "Answer 1"));
            if (error_nav) {
                this.msg_err = `Couldn't find '${expected}' in ${URL}\n\t\t\tError: >>${error_nav}<<\n\t\t\tReceived: >>${browser.html('body')}<<`;
            }
            try {
                browser.assert.elements("form", {atLeast: 1});
                browser.document.forms[0].submit();
                await to(browser.wait());
            } catch (e) {
                error_nav = e;
            }
            this.msg_ok = `Found '${expected}' in ${URL}`;
            this.msg_err = `Couldn't find '${expected}' in ${URL}\n\t\t\tError: >>${error_nav}<<\n\t\t\tReceived: >>${browser.html('body')}<<`;
            Utils.search(expected, browser.html('body')).should.be.equal(true);
        }
    });

    it('', async function () {
        this.name = `5: Checking 'Delete' implementation...`;
        this.score = 3;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            let error_nav;
            const expected = 'a[href="/quizzes/2?_method=DELETE"]';
            this.msg_ok = `Successfully deleted quiz 2 in ${URL}`;
            [error_nav, resp] = await to(browser.visit(URL));
            this.msg_err = `Could not delete quiz 2 clicking '${expected}' in ${URL}\n\t\t\tError: >>${error_nav}`;
            [error_nav, resp] = await to(browser.click('a[href="/quizzes/2?_method=DELETE"]'));
            this.msg_err = `Could not delete quiz 2 clicking '${expected}' in ${URL}\n\t\t\tError: >>${error_nav}`;
            [error_nav, resp] = await to(browser.visit(URL));
            this.msg_err = `Could not delete quiz 2 clicking '${expected}' in ${URL}\n\t\t\tError: >>${error_nav}`;
            browser.querySelectorAll(expected).length.should.be.equal(0);
        }
    });

    it('', async function () {
        this.name = `6: Checking 'Play' implementation...`;
        this.score = 3;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const expected = /yes/img;
            let error_nav;
            [error_nav, resp] = await to(browser.visit(URL));
            if (error_nav) {
                this.msg_err = `Couldn't find '${expected}' in ${URL}\n\t\t\tError: >>${error_nav}<<\n\t\t\tReceived: >>${browser.html('body')}<<`;
            }
            [error_nav, resp] = await to(browser.click('a[href="/quizzes/1/play"]'));
            if (error_nav) {
                this.msg_err = `Couldn't find '${expected}' in ${URL}\n\t\t\tError: >>${error_nav}<<\n\t\t\tReceived: >>${browser.html('body')}<<`;
            }
            [error_nav, resp] = await to(browser.fill('input[name=response]', "Answer 1"));
            if (error_nav) {
                this.msg_err = `Couldn't find '${expected}' in ${URL}\n\t\t\tError: >>${error_nav}<<\n\t\t\tReceived: >>${browser.html('body')}<<`;
            }
            try {
                browser.assert.elements("form", {atLeast: 1});
                browser.document.forms[0].submit();
                await to(browser.wait());
            } catch (e) {
                error_nav = e;
            }
            this.msg_ok = `Found '${expected}' in ${URL}`;
            this.msg_err = `Couldn't find '${expected}' in ${URL}\n\t\t\tError: >>${error_nav}<<\n\t\t\tReceived: >>${browser.html('body')}<<`;
            Utils.search(expected, browser.html('body')).should.be.equal(true);
        }
    });

    after("Closing the server", async function () {
        // kill server
        if (server) {
            server.kill();
            await to(timeout(T_WAIT * 1000));
        }
        // restore original db file
        try {fs.copySync(quizzes_back, quizzes_orig, {"overwrite": true});} catch (e){}
    });
});
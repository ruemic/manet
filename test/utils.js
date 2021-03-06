'use strict';

var assert = require('assert'),
    os = require('os'),
    utils = require('../src/utils');


describe('utils', function () {

    process.env.silent = true;

    describe('fixUrl', function () {

        it('null-value', function () {
            assert.equal(null, utils.fixUrl(null));
        });

        it('HTTP scheme', function () {
            var url = 'http://android-arsenal.com';
            assert.equal(url, utils.fixUrl(url));
        });

        it('HTTPS scheme', function () {
            var url = 'https://android-arsenal.com';
            assert.equal(url, utils.fixUrl(url));
        });

    });

    describe('encodeBase64', function () {

        it('BASE64 for not empty JSON object', function () {
            assert.equal(
                'eyJmb3JjZSI6dHJ1ZX0=',
                utils.encodeBase64({
                    'force': true
                })
            );
        });

        it('BASE64 for empty JSON object', function () {
            assert.equal(
                'e30=',
                utils.encodeBase64({})
            );
        });

        it('BASE64 for null-object', function () {
            assert.equal(
                'bnVsbA==',
                utils.encodeBase64(null)
            );
        });

        it('BASE64 for non-JSON object', function () {
            assert.equal(
                'IlN0cmluZyI=',
                utils.encodeBase64('String')
            );
        });

    });

    describe('filePath', function () {

        it('not null', function () {
            var file = utils.filePath('.');
            assert.notEqual(null, file);
            assert.notEqual('', file);
        });

    });

    describe('runFsWatchdog', function () {

        it('should not start fs watch dog', function () {
            assert.equal(null, utils.runFsWatchdog(null, 0, null));
            assert.equal(null, utils.runFsWatchdog(null, 60, null));
            assert.equal(null, utils.runFsWatchdog('/tmp', 0, null));
        });

        it('should start fs watch dog correctly', function () {
            var watchdog = utils.runFsWatchdog(os.tmpdir(), 1, function () {});
            assert.notEqual(null, watchdog);
            clearInterval(watchdog);
        });

    });


    describe('execProcess', function () {

        it('should not execute empty command', function (done) {
            assert.throws(function () {
                utils.execProcess(null, null);
            });
            assert.throws(function () {
                utils.execProcess(null, {});
            });
            done();
        });

        it('execute "ls"', function (done) {
            utils.execProcess(['ls'], null, function (error1) {
                assert.equal(null, error1);
                utils.execProcess(['ls'], {}, function (error2) {
                    assert.equal(null, error2);
                    done();
                });
            });
        });

        it('execute "ls -l"', function (done) {
            utils.execProcess(['ls', '-l'], null, function (error) {
                assert.equal(null, error);
                done();
            });
        });

        it('execute "ls -l -a"', function (done) {
            utils.execProcess(['ls', '-l', '-a'], null, function (error) {
                assert.equal(null, error);
                done();
            });
        });

    });

});

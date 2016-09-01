#!/usr/bin/env node

'use strict';
const fs = require('fs');
const os = require('os');
const dns = require('dns');
const fse = require('fs-extra');
const got = require('got');
const logUpdate = require('log-update');
const ora = require('ora');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const spinner = ora();

const arg = process.argv[2];

if (!arg || arg === '-h' || arg === '--help') {
	console.log(
		`
 ${chalk.cyan('Usage   :')} instafy ${chalk.blue('[username]')}

 ${chalk.cyan('Example :')} instafy ${chalk.green('iama_rishi')}

 ${chalk.cyan('Help    :')} ${chalk.dim('instafy -h')} or ${chalk.dim('--help')}

 ${chalk.cyan('Version :')} ${chalk.dim('instafy -v')} or ${chalk.dim('--version')}
 `
	);
	process.exit(1);
}

if (arg === '-v' || arg === '--version') {
	console.log(`\n${chalk.yellow(' Verison :')} ${chalk.cyan(pkg.version)}\n`);
	process.exit(1);
}

const pre = chalk.cyan.bold('›');
const pos = chalk.red.bold('›');

const url = `https://instagram.com/${arg}`;

const mainPath = os.homedir();
const reqPath = `/.instafy/${arg}.txt`;

const file = `${mainPath}${reqPath}`;

const match = arg => {
	const rePattern = /{(.+?)}/g;
	return arg.match(rePattern)[4].split(', "')[0].split(' ')[1].replace('}', '');
};

dns.lookup('instagram.com', err => {
	if (err && err.code === 'ENOTFOUND') {
		logUpdate(`\n${pos} ${chalk.dim('Please check your internet connection\n')}`);
		process.exit(1);
	} else {
		console.log();
		spinner.text = `${chalk.dim('Checking for new posts!')}`;
		spinner.start();

		if (!fs.existsSync(file)) {
			fse.ensureFile(file, err => {
				if (err) {
					process.exit(1);
				} else {
					spinner.text = `${chalk.dim(`Instafying ${arg}`)}`;
					got(url).then(res => {
						const part = res.body;
						const matchPart = match(part);
						const buffer = new Buffer(`${matchPart}`);
						spinner.stop();
						logUpdate(`${pre} run ${chalk.yellow('instafy')} again!\n`);
						const stream = fs.createWriteStream(file);
						stream.once('open', () => {
							stream.write(buffer);
							stream.end();
						});
					}).catch(err => {
						if (err) {
							spinner.stop();
							logUpdate(`${pos} ${chalk.yellow(arg)} is not an Instagram user.\n`);
							fs.unlinkSync(file);
						}
					});
				}
			});
		}

		if (fs.existsSync(file)) {
			got(url).then(res => {
				const store = res.body;
				const arrPost = match(store);
				const read = fs.readFileSync(file, 'utf-8');

				const remotePosts = parseInt(arrPost, 10);
				const localPosts = parseInt(read, 10);

				let message = '';

				if (remotePosts === localPosts) {
					message = `${pre} ${chalk.yellow(`No new posts by ${arg}!`)}\n`;
				} else if (remotePosts > localPosts) {
					message = `${pre} ${chalk.green('Notification :')} ${chalk.yellow(`${arg} added ${remotePosts - localPosts} new post(s)`)}\n\n${pre} ${chalk.dim(`Check at     : ${url}`)}\n`;
				} else {
					message = `${pos} ${chalk.red('Notification :')} ${chalk.yellow(`${arg} removed ${localPosts - remotePosts} post(s)`)}\n`;
				}

				const buffer = new Buffer(`${arrPost}`);
				const stream = fs.createWriteStream(file);
				stream.once('open', () => {
					stream.write(buffer);
					stream.end();
				});
				spinner.stop();
				logUpdate(message);
			}).catch(err => {
				if (err) {
					spinner.stop();
					logUpdate(`${pos} ${chalk.yellow(arg)} is not an Instagram user.\n`);
				}
			});
		}
	}
});

#!/usr/bin/env node

'use strict';

const os = require('os');
const fs = require('fs');
const dns = require('dns');
const fse = require('fs-extra');
const got = require('got');
const logUpdate = require('log-update');
const ora = require('ora');
const chalk = require('chalk');
const unicode = require('unicodechar-string');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const spinner = ora();

const arg = process.argv[2];
const nex = process.argv[3];

const pre = chalk.cyan.bold('›');
const pos = chalk.red.bold('›');

const url = `https://www.instagram.com/${arg}`;
const baseDir = `${os.homedir()}/.instafy/`;
const dir = `${baseDir}${arg}.txt`;
const rem = `${baseDir}${nex}.txt`;

if (!arg || arg === '-h' || arg === '--help') {
	console.log(`
  Keep your browser history clean!

  ${chalk.cyan('Usage')}   : instafy <username> | [command] <username>

  ${chalk.cyan('Command')} :
   -r,  --remove        remove a user from istafy list
   -c,  --clean         clean instafy directory
   -h,  --help          show help

  ${chalk.cyan('Example')} :
   $ instafy 9gag
  `);
	process.exit(1);
}

if (arg === '-c' || arg === '--clean') {
	fse.emptyDir(baseDir, err => {
		if (err) {
			process.exit(1);
		} else {
			console.log(`\n${pre} Cleaned!\n`);
			process.exit(1);
		}
	});
}

if (arg === '-r' || arg === '--remove') {
	if (!nex) {
		logUpdate(`\n${pos} Provide a username!\n`);
		process.exit(1);
	}
	if (nex && fs.existsSync(rem)) {
		fs.unlinkSync(rem);
	} else {
		logUpdate(`\n${pos} Sorry! ${chalk.bold(nex)} has not been instafyed yet\n`);
		process.exit(1);
	}
	logUpdate(`\n${pre} Removed ${nex} from the list!\n`);
}

if (arg !== '-c' && arg !== '--clear' && arg !== '-r' && arg !== '--remove' && !nex) {
	logUpdate();
	spinner.text = `${chalk.dim('Let the stalking begin!')}`;
	spinner.start();
	dns.lookup('instagram.com', err => {
		if (err) {
			spinner.stop();
			logUpdate(`\n${pos} ${chalk.dim('Please check your internet connection!')}\n`);
		} else {
			logUpdate();
			spinner.text = chalk.dim('Checking for new posts!');
			spinner.start();

			if (!fs.existsSync(dir)) {
				fse.ensureFile(dir, err => {
					if (err) {
						process.exit(1);
					} else {
						logUpdate();
						spinner.text = `${chalk.dim(`Instafying ${arg}`)}`;
						got(url).then(res => {
							const count = res.body.split(',"edge_owner_to_timeline_media":{"count":')[1].split(',"page_info":')[0];
							spinner.stop();
							logUpdate(`\n${pre} ${chalk.dim('Run')} ${chalk.green(`instafy ${arg}`)} ${chalk.dim('next time to get post notifications!')}\n`);
							const buffer = Buffer.from(`${count}`);
							const stream = fs.createWriteStream(dir);
							stream.once('open', () => {
								stream.write(buffer);
								stream.end();
							});
						}).catch(err => {
							if (err) {
								spinner.stop();
								logUpdate(`\n${pos} ${chalk.yellow(arg)} ${chalk.dim('is not an Instagram user.')}\n`);
								fs.unlinkSync(dir);
							}
						});
					}
				});
			}
			if (fs.existsSync(dir)) {
				got(url).then(res => {
					const remotePosts = res.body.split(',"edge_owner_to_timeline_media":{"count":')[1].split(',"page_info"')[0];
					const localPosts = fs.readFileSync(dir, 'utf-8');
					const name = res.body.split(',"full_name":"')[1].split('",')[0] || `${arg}`;
					const changeRemote = parseInt(remotePosts, 10);
					const changeLocal = parseInt(localPosts, 10);

					spinner.stop();

					if (changeRemote === changeLocal) {
						logUpdate(`\n${pre} ${chalk.cyan('Notification :')} ${chalk.green('No new posts by')} ${unicode(name)}\n`);
					} else if (changeRemote > changeLocal) {
						logUpdate(`\n${pre} ${chalk.blue('Notification :')} ${changeRemote - changeLocal} new post(s) by ${unicode(name)}\n\n${pre} ${chalk.blue('Check at     :')} ${url} \n`);
					} else {
						logUpdate(`\n${pos} ${chalk.red('Notification :')} ${unicode(name)} deleted ${changeLocal - changeRemote} post(s)\n`);
					}

					const buffer = Buffer.from(`${remotePosts}`);
					const stream = fs.createWriteStream(dir);
					stream.once('open', () => {
						stream.write(buffer);
						stream.end();
					});
				});
			}
		}
	});
}

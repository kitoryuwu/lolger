// SPDX-License-Identifier: Apache-2.0

import chalk from "chalk";
import stringify from "json-stringify-safe";

type ChalkType = typeof chalk;

enum LogLevel {
	DEBUG = 0,
	LOG = 1,
	INFO = 2,
	WARN = 3,
	ERROR = 4
}

type LogLevelName = keyof typeof LogLevel;

class Logger {
	public static level: LogLevel = LogLevel.LOG;

	public static namespaceColors: string[] = [
		"#D46A6A",
		"#6AD4A1",
		"#6A8ED4",
		"#D46ABF",
		"#D4A26A",
		"#6AD0D4",
		"#A16AD4",
		"#6AD49F",
		"#D46A94",
		"#6AABD4"
	];

	private static levelChalk: Record<LogLevelName, ChalkType> = {
		DEBUG: chalk.magenta.bold,
		LOG: chalk.cyan.bold,
		INFO: chalk.blue.bold,
		WARN: chalk.yellow.bold,
		ERROR: chalk.red.bold
	};

	private namespace: string;
	private nsChalk: ChalkType;

	constructor(namespace: string) {
		this.namespace = namespace;
		const hash = Array.from(this.namespace).reduce((h, c) => h + c.charCodeAt(0), 0);
		const idx = hash % Logger.namespaceColors.length;
		this.nsChalk = chalk.hex(Logger.namespaceColors[idx]);
	}

	private format(level: LogLevelName, message: string): string {
		const now = new Date().toTimeString().slice(0, 8);
		const timePart = chalk.gray(now);
		const levelStr = `${" ".repeat(5 - level.length)}[${level}]`;
		const levelPart = Logger.levelChalk[level](levelStr);
		const nsPart = this.nsChalk(`(${this.namespace})`);
		const msgPart = chalk.reset(message);
		return `${timePart} ${levelPart} ${nsPart} ${msgPart}`;
	}

	private msgToString(msg: unknown): string {
		if (typeof msg === "string") {
			return msg;
		}
		else if (msg instanceof Error) {
			return msg.stack ?? `${msg.name}: ${msg.message}`;
		}
		else if (msg instanceof Function) {
			return "function()";
		}
		else {
			return stringify(msg, null, 2);
		}
	}

	public debug = (...msgs: unknown[]) => {
		if (Logger.level <= LogLevel.DEBUG) {
			console.debug(this.format("DEBUG", msgs.map(this.msgToString).join(" ")));
		}
	};

	public log = (...msgs: unknown[]) => {
		if (Logger.level <= LogLevel.INFO) {
			console.log(this.format("LOG", msgs.map(this.msgToString).join(" ")));
		}
	};

	public info = (...msgs: unknown[]) => {
		if (Logger.level <= LogLevel.INFO) {
			console.info(this.format("INFO", msgs.map(this.msgToString).join(" ")));
		}
	};

	public warn = (...msgs: unknown[]) => {
		if (Logger.level <= LogLevel.WARN) {
			console.warn(this.format("WARN", msgs.map(this.msgToString).join(" ")));
		}
	};

	public error = (...msgs: unknown[]) => {
		if (Logger.level <= LogLevel.ERROR) {
			console.error(this.format("ERROR", msgs.map(this.msgToString).join(" ")));
		}
	};
}

function getLogger(ns: string): Logger {
	return new Logger(ns);
}

function setLogLevel(level: LogLevel) {
	Logger.level = level;
}

export type { LogLevel };
export { Logger, getLogger, setLogLevel };

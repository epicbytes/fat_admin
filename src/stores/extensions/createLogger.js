import { types } from "mobx-state-tree";
import log from "loglevel";
import chalk from "chalk";
import prefix from "loglevel-plugin-prefix";

const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red
};

export function createLogger(pref = "n/a") {
  return types
    .model({})
    .volatile(self => {
      prefix.reg(log);

      prefix.apply(log, {
        format(level, name, timestamp) {
          return `${pref}: ${chalk.gray(`[${timestamp}]`)} ${colors[
            level.toUpperCase()
          ](level)} ${chalk.green(`${name}:`)}`;
        }
      });

      prefix.apply(log.getLogger("critical"), {
        format(level, name, timestamp) {
          return chalk.red.bold(`${pref}[${timestamp}] ${level} ${name}:`);
        }
      });
      return { log };
    })
    .actions(self => {
      const afterCreate = () => {
        if (process.env.NODE_ENV === "production") {
          self.log.disableAll();
        } else {
          self.log.enableAll();
        }
      };

      return {
        afterCreate
      };
    });
}

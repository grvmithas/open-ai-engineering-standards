import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

/**
 * @param {string} question
 * @param {Array<{ id: string, label: string }>} choices
 * @param {string} [defaultId]
 */
export async function choose(question, choices, defaultId) {
  const rl = readline.createInterface({ input, output });
  try {
    output.write(`\n${question}\n`);
    choices.forEach((c, i) => {
      output.write(`  ${i + 1}. ${c.label} (${c.id})\n`);
    });
    const hint = defaultId ? ` [${defaultId}]` : '';
    const answer = (await rl.question(`Select number or id${hint}: `)).trim();
    if (!answer && defaultId) return defaultId;
    const asNum = Number.parseInt(answer, 10);
    if (!Number.isNaN(asNum) && asNum >= 1 && asNum <= choices.length) {
      return choices[asNum - 1].id;
    }
    const byId = choices.find(c => c.id === answer || c.label.toLowerCase() === answer.toLowerCase());
    if (byId) return byId.id;
    throw new Error(`Invalid selection: ${answer}`);
  } finally {
    rl.close();
  }
}

/**
 * @param {string} question
 * @param {boolean} [defaultYes]
 */
export async function confirm(question, defaultYes = true) {
  const rl = readline.createInterface({ input, output });
  try {
    const suffix = defaultYes ? ' [Y/n] ' : ' [y/N] ';
    const answer = (await rl.question(`${question}${suffix}`)).trim().toLowerCase();
    if (!answer) return defaultYes;
    return answer === 'y' || answer === 'yes';
  } finally {
    rl.close();
  }
}

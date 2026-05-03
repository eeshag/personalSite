import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const isWindows = process.platform === 'win32';
const npmCommand = isWindows ? 'npm.cmd' : 'npm';

const children = [];
let isShuttingDown = false;

const spawnProcess = (name, command, args, cwd) => {
  const child = spawn(command, args, {
    cwd,
    stdio: 'inherit',
    shell: isWindows,
    env: process.env
  });

  children.push({ name, child });

  child.on('exit', (code, signal) => {
    if (isShuttingDown) return;

    if (code === 0) {
      console.log(`[${name}] exited cleanly.`);
      return;
    }

    const reason =
      signal
        ? `signal ${signal}`
        : `code ${typeof code === 'number' ? code : 'unknown'}`;

    console.error(`[${name}] exited unexpectedly with ${reason}. Stopping the other process.`);
    shutdown(typeof code === 'number' ? code : 1);
  });

  child.on('error', (error) => {
    if (isShuttingDown) return;
    console.error(`[${name}] failed to start: ${error.message}`);
    shutdown(1);
  });
};

const shutdown = (exitCode = 0) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  for (const { child } of children) {
    if (child.killed) continue;
    child.kill('SIGINT');
  }

  setTimeout(() => {
    for (const { child } of children) {
      if (!child.killed) {
        child.kill('SIGTERM');
      }
    }
  }, 1200);

  setTimeout(() => {
    process.exit(exitCode);
  }, 1600);
};

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

spawnProcess('client', npmCommand, ['run', 'dev:client'], projectRoot);
spawnProcess('server', npmCommand, ['run', 'dev:server'], projectRoot);

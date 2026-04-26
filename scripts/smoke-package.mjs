import { mkdtemp, rm } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)));

function commandForPlatform(command, args) {
  if (command === 'npm') {
    const npmCli =
      process.env.npm_execpath ??
      join(dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');

    return {
      command: process.execPath,
      args: [npmCli, ...args],
    };
  }

  if (command === 'node') {
    return {
      command: process.execPath,
      args,
    };
  }

  return { command, args };
}

function run(command, args, options = {}) {
  const platformCommand = commandForPlatform(command, args);
  const result = spawnSync(platformCommand.command, platformCommand.args, {
    cwd: options.cwd ?? root,
    stdio: 'inherit',
    shell: false,
    env: {
      ...process.env,
      npm_config_registry: 'https://registry.npmjs.org',
    },
  });

  if (result.status !== 0) {
    if (result.error) {
      throw result.error;
    }

    throw new Error(`${command} ${args.join(' ')} failed`);
  }
}

const tempDir = await mkdtemp(join(tmpdir(), 'roar-ui-smoke-'));

try {
  run('npm', ['run', 'build', '-w', '@roar-workspace/ui']);
  run('npm', ['pack', '-w', '@roar-workspace/ui', '--pack-destination', tempDir]);

  const tarballName = (await readdir(tempDir)).find((file) => file.endsWith('.tgz'));
  if (!tarballName) {
    throw new Error('Expected npm pack to create a tarball');
  }
  const tarball = join(tempDir, tarballName);
  run('npm', ['init', '-y'], { cwd: tempDir });
  run('npm', ['install', tarball, 'react', 'react-dom', 'tailwindcss', '--silent'], {
    cwd: tempDir,
  });

  run(
    'node',
    [
      '--input-type=module',
      '-e',
      [
        "const root = await import('@roar-workspace/ui');",
        "const forms = await import('@roar-workspace/ui/forms');",
        "const display = await import('@roar-workspace/ui/display');",
        "const layout = await import('@roar-workspace/ui/layout');",
        "const product = await import('@roar-workspace/ui/product');",
        "const overlays = await import('@roar-workspace/ui/overlays');",
        "const charts = await import('@roar-workspace/ui/charts');",
        "if (!root.Button || !forms.Input || !display.Card || !layout.Header || !product.PostCard || !overlays.Dialog || !charts.ChartShell) throw new Error('Missing expected package export');",
        "console.log('package smoke ok');",
      ].join(' '),
    ],
    { cwd: tempDir },
  );
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

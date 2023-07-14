const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function buildAndroid() {
  const config = fs.readFileSync(path.resolve(__dirname, 'build.json'), 'utf8');
  const buildConfig = JSON.parse(config);
  const type = process.argv[2];

  const types = {
    'fix': [0, 0, 1],
    'feat': [0, 1, 0],
    'release': [1, 0, 0]
  };

  if (!types[type]) {
    throw new Error('Informe o tipo de build: fix, feat ou release');
  }

  const currentVersion = buildConfig.version.split('.');

  const newVersion = currentVersion.map((value, index) => {
    return Number(value) + types[type][index];
  }).join('.');

  console.log('Versão atualizada', `\x1b[31m${buildConfig.version}\x1b[0m`, '->', `\x1b[32m${newVersion}\x1b[0m`)

  const newBuildConfig = {
    ...buildConfig,
    version: newVersion,
    date: new Date().toLocaleString('pt-BR')
  }

  fs.writeFileSync(path.resolve(__dirname, 'build.json'), JSON.stringify(newBuildConfig, null, 2));

  const appName = buildConfig.appName + '-' + newVersion;

  const apkPath = path.resolve(__dirname) + buildConfig.path;

  console.log('Build iniciado...');

  const loadingInterval = showLoading();
  console.time('Build time');

  exec('cd android && .\\gradlew assembleRelease', (error) => {
    clearInterval(loadingInterval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    if (error) {
      console.error(`Ocorreu um erro: ${error}`);
      return;
    }
    console.log('Build concluído com sucesso! APP NAME:', appName);
    console.timeEnd('Build time');

    fs.renameSync(
      path.resolve(__dirname, `${apkPath}/app-release.apk`),
      path.resolve(__dirname, `${apkPath}/${appName}.apk`));

    console.log('Arquivo renomeado com sucesso!');
  });
}

buildAndroid();


function showLoading() {
  let i = 0;
  const frames = ['-', `\\`, '|', '/'];

  return setInterval(() => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Carregando ${frames[i]}`);
    i = (i + 1) % frames.length;
  }, 200);
}

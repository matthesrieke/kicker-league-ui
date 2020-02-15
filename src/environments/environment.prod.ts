import { Settings } from 'src/app/model/settings';

export const environment = {
  production: true
};


export let settings: Settings;

export const settingsPromise = new Promise<Settings>((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './assets/settings.prod.json');
  xhr.onload = () => {
    if (xhr.status === 200) {
      settings = JSON.parse(xhr.responseText);
      resolve(settings);
    } else {
      reject('Cannot load configuration...');
    }
  };
  xhr.send();
});

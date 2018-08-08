import { Storage } from 'aws-amplify';

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;
  /* if you want private storage, do Storage.vault.put */
  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });
  return stored.key;
}

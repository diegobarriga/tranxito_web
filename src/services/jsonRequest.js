export default async function jsonRequest(path, options = {}) {

  const base_path = 'https://private-459d3-elde2e.apiary-mock.com'

  const result = await fetch(`${base_path}${path}`, {
    ...options,
    headers: { ...options.headers, Accept: 'application/json' },
    // credentials: 'same-origin',
  });
  const json = await result.json();
  if (result.status !== 200) {
    throw Object.assign(new Error(), json);
  }
  return json;
}

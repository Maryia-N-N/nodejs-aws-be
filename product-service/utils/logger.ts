export const log = (message = '', event) => console.log(`${event.path} [${event.httpMethod}] with body [${JSON.stringify(event.body || '-')}]: ${message}`);

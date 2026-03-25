/* Simple shim for the Node 'url' module to satisfy browser builds */
export const URL = window.URL;
export default { URL };
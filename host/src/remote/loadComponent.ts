// @ts-ignore
// @ts-nocheck
type RemoteProxy = {
  get: (request: string) => any;
  init: (arg: any) => any;
};
type RemoteModuleFactory = () => any;

export const loadComponent = (
  remoteName: string,
  remoteUrl: string,
  moduleName: string,
  scope = 'default'
) => async (): Promise<{default:React.ComponentType<any>}> => {
  // Check if this remote has already been loaded 
  if (!(remoteName in window)) {
    // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__(scope);
    // Fetch the remote app. We assume our remote app is exposing a `remoteEntry.js` file.
    const fetchedContainer = await fetchRemote(
      `${remoteUrl}`,
      remoteName
    );
    // Initialize the remote app
    await fetchedContainer.init(__webpack_share_scopes__[scope]);
  }
  // 'container' is the remote app
  const container = window[remoteName] as any;
  // The module passed to get() must match the "exposes" item in our remote app exactly
  const factory = (await container.get(`./${moduleName}`)) as RemoteModuleFactory;
  // 'Module' is the React Component from our remote app's "exposes" configuration
  const Module = factory();
  return Module;
};

export const fetchRemote = (url: string, remoteName: string): Promise<RemoteProxy> =>
  new Promise((resolve, reject) => {
    // We define a script tag to use the browser for fetching the remoteEntry.js file
    const script = document.createElement('script');
    script.src = url;
    script.onerror = (err) => {
      reject(new Error(`Failed to fetch remote: ${remoteName}`));
    };
    // When the script is loaded we need to resolve the promise back to Module Federation
    script.onload = () => {
      // The script is now loaded on window using the name defined within the remote
      const proxy: RemoteProxy = {
        get: (request) => (window as any)[remoteName].get(request),
        init: (arg) => {
          try {
            return (window as any)[remoteName].init(arg);
          } catch (e) {
            console.error(`Failed to initialize remote: ${remoteName}`);
            reject(e);
          }
        },
      };
      resolve(proxy);
    };
    // Lastly we inject the script tag into the document's head to trigger the script load
    document.head.appendChild(script);
  });
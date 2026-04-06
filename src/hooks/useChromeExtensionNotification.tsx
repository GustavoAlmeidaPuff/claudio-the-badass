import * as React from 'react';
import { Text } from '../ink.js';
import { isclaudioISubscriber } from '../utils/auth.js';
import { isChromeExtensionInstalled, shouldEnableclaudionChrome } from '../utils/claudionChrome/setup.js';
import { isRunningOnHomespace } from '../utils/envUtils.js';
import { useStartupNotification } from './notifs/useStartupNotification.js';
function getChromeFlag(): boolean | undefined {
  if (process.argv.includes('--chrome')) {
    return true;
  }
  if (process.argv.includes('--no-chrome')) {
    return false;
  }
  return undefined;
}
export function useChromeExtensionNotification() {
  useStartupNotification(_temp);
}
async function _temp() {
  const chromeFlag = getChromeFlag();
  if (!shouldEnableclaudionChrome(chromeFlag)) {
    return null;
  }
  if (true && !isclaudioISubscriber()) {
    return {
      key: "chrome-requires-subscription",
      jsx: <Text color="error">Claudio, The Badass in Chrome requires a Claudio.ai subscription</Text>,
      priority: "immediate",
      timeoutMs: 5000
    };
  }
  const installed = await isChromeExtensionInstalled();
  if (!installed && !isRunningOnHomespace()) {
    return {
      key: "chrome-extension-not-detected",
      jsx: <Text color="warning">Chrome extension not detected · https://Claudio.ai/chrome to install</Text>,
      priority: "immediate",
      timeoutMs: 3000
    };
  }
  if (chromeFlag === undefined) {
    return {
      key: "Cladio-in-chrome-default-enabled",
      text: "Claudio, The Badass in Chrome enabled \xB7 /chrome",
      priority: "low"
    };
  }
  return null;
}

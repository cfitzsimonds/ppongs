// Configuration file - client id matches up with the ppongs application on rightpoint's azure AD

var adalConfig = {
  tenant: 'common',
  clientId: '328722a2-8aa6-4b41-b723-97d7c4ab967a',
  extraQueryParameter: 'nux=1',
  disableRenewal: true,
  endpoints: {
    'https://graph.microsoft.com': 'https://graph.microsoft.com'
  }
  // cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
};

module.exports = adalConfig;

const DEFAULT_SETTINGS = {
  status: false,
  rules: [
    ['*://developer.android.com/*', 'android.com', 'android.google.cn'],
    ['*://developers.google.com/*', 'google.com', 'google.cn'],
    ['*://www.google.com/chrome/*', 'google.com', 'google.cn'],
    ['*://*.google.com/recaptcha/*', 'google.com', 'recaptcha.net'],
    [
      '*://ajax.googleapis.com/ajax/libs/jquery*',
      'ajax.googleapis.com',
      'cdnjs.cloudflare.com',
    ],
  ],
};

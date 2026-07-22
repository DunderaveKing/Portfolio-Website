// Config for third-party services. Kept separate from profile.js since
// this isn't "about you" content, it's a service credential.

// Web3Forms turns a plain HTML/React form into working email delivery,
// with no backend server needed. Get your own key (takes ~30 seconds,
// no account required) at https://web3forms.com — enter your email,
// they immediately email you an access key. Paste it below.
//
// This key is safe to commit/expose in client-side code: Web3Forms
// access keys only allow SUBMITTING to the email tied to that key, not
// reading or managing anything, so it can't be abused if someone copies
// it from your site's source.
export const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE'

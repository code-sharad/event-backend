const dotenv = require('dotenv');
dotenv.config();
const fb_access_token = process.env.FB_ACCESS_TOKEN;
const fb_verify_token = process.env.FB_VERIFY_TOKEN;
const fb_app_secret = process.env.FB_APP_SECRET;

module.exports = { fb_access_token };

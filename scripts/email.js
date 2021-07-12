#! /usr/bin/env node

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const DISPLAY_URL_JSON = JSON.parse(process.env.DISPLAY_URL_JSON);
const DISPLAY_USER_JSON = JSON.parse(process.env.DISPLAY_USER_JSON);
const TO_EMAIL = process.env.TO_EMAIL;
const SFDX_URL = process.env.SFDX_URL;

const str = '${string:1:-1}';

const TEXT = `
Here's your personal scratch org info.
You can open your org at ${DISPLAY_URL_JSON.result.url}.
Here are some other details of your org.
Org ID: ${DISPLAY_USER_JSON.result.orgId}
Username: ${DISPLAY_USER_JSON.result.username}
Password: ${DISPLAY_USER_JSON.result.password}
Instance URL: ${DISPLAY_USER_JSON.result.instanceUrl}
Login URL: ${DISPLAY_USER_JSON.result.loginUrl}

Login from VS Code

mkdir .github_actions
touch .github_actions/.SFDX_URL_STORE.txt
string=${SFDX_URL}
echo ${str} >> .github_actions/.SFDX_URL_STORE.txt
sfdx force:auth:sfdxurl:store --sfdxurlfile=.github_actions/.SFDX_URL_STORE.txt --setalias=scratch-org
rm -r .github_actions
`;
console.log('TO_EMAIL', TO_EMAIL);

/*const msg = {
    to: TO_EMAIL,
    from: 'chandrakiran.vish@gmail.com',
    subject: 'Welcome to your new scratch org',
    text: TEXT,
};*/
const msg = {
    to: 'chandra@relayco.io',
    from: 'chandrakiran.vish@gmail.com',
    subject: 'Welcome to your new scratch org',
    text: TEXT,
};

sgMail
    .send(msg)
    .then(() => console.log('Mail sent successfully'))
    .catch(error => console.error(error.toString()));

const { exec } = require('child_process');
const config = require('./config');

const endpoint = `${config.privateApiUrl}/srm/v1/all`;
const localFile = `${__dirname}/srm-redirects.json`;

// cURL down Safe Redirect Manager JSON every minute.
exec(`bash crontab -l | { cat; echo "* * * * * curl ${endpoint} --output ${localFile}"; } | crontab -`);
exec('service cron start');

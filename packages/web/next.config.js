const path = require("path");

const saruniJson = require("../../saruni.json");

let API_ENDPOINT;

if (process.env.STAGE === "local" && process.env.USE_CLOUD === "true") {
  API_ENDPOINT = saruniJson.serverless.dev.domainUrl;
} else if (process.env.STAGE === "dev") {
  API_ENDPOINT = saruniJson.serverless.dev.domainUrl;
} else if (process.env.STAGE === "prod") {
  API_ENDPOINT = saruniJson.serverless.prod.domainUrl;
} else if (process.env.STAGE === "local") {
  API_ENDPOINT = `http://${saruniJson.devServerPort.api}`;
} else {
  API_ENDPOINT = saruniJson.serverless.dev.domainUrl;
}

module.exports = {
  env: {
    API_ENDPOINT,
  },
  trailingSlash: true,
};

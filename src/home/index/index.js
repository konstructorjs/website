const axios = require('axios');
const moment = require('moment');

const requestGithub = async url => axios.get(`${url}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);

module.exports = class index {
  async handler() {
    const data = {};
    try {
      data.release = await requestGithub('https://api.github.com/repos/konstructorjs/konstructor/releases/latest');
      data.downloads = await axios.get('https://api.npmjs.org/downloads/point/last-month/@konstructor/konstructor');
      data.commits = await requestGithub('https://api.github.com/repos/konstructorjs/konstructor/commits');
      data.meta = true;
    } catch (err) {
      // do nothing
    }
    return this.view(data);
  }

  async view(input) {
    const data = {};
    if (input.meta) {
      data.version = input.release.data.tag_name;
      data.downloads = input.downloads.data.downloads;
      data.commit = {
        ago: moment(input.commits.data[0].commit.author.date).fromNow(),
        author: input.commits.data[0].commit.author.name,
      };
      data.meta = true;
    }
    return this.render(data);
  }
};

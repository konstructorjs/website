const axios = require('axios');
const moment = require('moment');

const requestGithub = async url => axios.get(`${url}?client_id=0ad79ba643bb67562b43&client_secret=0fddff9da710f57a4b25e76196d28646c78ebb7d`);

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

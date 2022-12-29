//development: /dev\.[a-z]*\.website-1\.com/, // Regex supported!
//production: /[\w|\d|-|_]+\.website-2.com/, // Regex supported!
module.exports = {
  tenants: [
    {
      name: '',
      domains: [
        {
          development: 'localhost',
          stage: 'beta.mentorfy.io',
          production: 'mentorfy.io',
        },
      ],
    },
    {
      name: 'app',
      domains: [
        {
          development: 'app.localhost',
          stage: 'app.mentorfy.io',
          production: 'app.mentorfy.io',
        },
      ],
    },
  ],
};

const faker = require("faker");
const { User } = require("./src/models/User");
const { hash } = require("bcryptjs");
const { Blog } = require("./src/models/Blog");

const getFaker = async (userCount, blogCount) => {
  try {
    const users = [];
    const blogs = [];
    const password = await hash("123456", 10);
    for (let i = 0; i < userCount; i++) {
      users.push(
        new User({
          // random username, email
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password,
          role: 0,
          createdAt: Date.now(),
        })
      );
    }

    users.map((user) => {
      for (let i = 0; i < blogCount; i++) {
        blogs.push(
          new Blog({
            title: faker.lorem.words(),
            content: faker.lorem.paragraphs(),
            isLive: true,
            user,
          })
        );
      }
    });
    await User.insertMany(users);
    await Blog.insertMany(blogs);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { getFaker };

export default (express, bodyParser, createReadStream, crypto, http, CORS) => {
  const app = express();
  app.set("view engine", "pug");
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app
    .use((req, res, next) => {
      res.set(CORS);
      next();
    })
    .get("/users/:url", async (req, res) => {
      const URL = req.body.URL;
      try {
        await mongoose.connect(URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      } catch (error) {
        console.log("error mongo", error);
      }

      const users = await User.find();
      res.locals.usersTitle = "Users title";
      res.format({
        "aplication/json": () => res.json(users),
        "text/html": () => res.render("users", { users }),
      });
    })
    .get("/sha1/:input", (req, res) => {
      const { input } = req.params;
      const shasum = crypto.createHash("sha1");
      shasum.update(input);
      res.send(shasum.digest("hex"));
    })
    .get("/login/", (req, res) => res.send("itmo287659"))
    .get("/code/", (req, res) => {
      res.set({ "Content-Type": "text/plain; charset=utf-8" });
      createReadStream(import.meta.url.substring(7)).pipe(res);
    })
    .get("/wordpress/wp-json/wp/v2/posts/1", (req, res) => {
      const post = {
        id: 1,
        date: "2021-01-03T20:27:31",
        date_gmt: "2021-01-03T20:27:31",
        guid: {
          rendered: "http://matveev-final001.herokuapp.com/wordpress/?p=1",
        },
        modified: "2021-01-03T20:27:31",
        modified_gmt: "2021-01-03T20:27:31",
        slug: "1",
        status: "publish",
        type: "post",
        link:
          "http://matveev-final001.herokuapp.com/wordpress/2021/01/03/itmo287659/",
        title: { rendered: "itmo287659" },
        content: { rendered: "", protected: false },
        excerpt: { rendered: "", protected: false },
        author: 1,
        featured_media: 0,
        comment_status: "open",
        ping_status: "open",
        sticky: false,
        template: "",
        format: "standard",
        meta: [],
        categories: [1],
        tags: [],
        _links: {
          self: [
            {
              href:
                "http://matveev-final001.herokuapp.com/wordpress/wp-json/wp/v2/posts/1",
            },
          ],
          collection: [
            {
              href:
                "http://matveev-final001.herokuapp.com/wordpress/wp-json/wp/v2/posts",
            },
          ],
          about: [
            {
              href:
                "http://matveev-final001.herokuapp.com/wordpress/wp-json/wp/v2/types/post",
            },
          ],
          author: [
            {
              embeddable: true,
              href:
                "http://matveev-final001.herokuapp.com/wordpress/wp-json/wp/v2/users/1",
            },
          ],
          replies: [
            {
              embeddable: true,
              href:
                "http://matveev-final001.herokuapp.com/wordpress/wp-json/wp/v2/comments?post=1",
            },
          ],
          "version-history": [
            {
              count: 1,
              href:
                "http://matveev-final001.herokuapp.com/wordpress/wp-json/wp/v2/posts/1/revisions",
            },
          ],
          "predecessor-version": [
            {
              id: 6,
              href:
                "http://matveev-final001.herokuapp.com/wordpress/wp-json/wp/v2/posts/1/revisions/6",
            },
          ],
          "wp:attachment": [
            {
              href:
                "http://matveev-final001.herokuapp.com/wordpress/wp-json/wp/v2/media?parent=1",
            },
          ],
          "wp:term": [
            {
              taxonomy: "category",
              embeddable: true,
              href:
                "http://matveev-final001.herokuapp.com/wordpress/wp-json/wp/v2/categories?post=1",
            },
            {
              taxonomy: "post_tag",
              embeddable: true,
              href:
                "http://matveev-final001.herokuapp.com/wordpress/wp-json/wp/v2/tags?post=1",
            },
          ],
          curies: [
            { name: "wp", href: "https://api.w.org/{rel}", templated: true },
          ],
        },
      };
      res.json(post);
    });

  app.post("/insert/", async (req, res) => {
    const { URL, login, password } = req.body;
    try {
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const newUser = new User({ login, password });
      await newUser.save();
      res.status(201).send(`User was saved with login ${login}`);
    } catch (e) {
      res.send(e.codeName);
    }
  });

  app.post("/render", (req, res) => {
    const data = req.body;
    const url = req.params.addr;
    console.log("data", data);
    res.render("index", { random2: data.random2, random3: data.random3 });
  });

  app.all("/req/", (req, res) => {
    let url = req.method === "POST" ? req.body.addr : req.query.addr;
    http.get(url, (response) => {
      let data = "";
      response.on("data", (chunk) => (data += chunk));
      response.on("end", () => {
        res
          .set({
            "Content-Type": "text/plain; charset=utf-8",
          })
          .end(data);
      });
    });
  });

  app
    .all("*", (req, res) => {
      res.send("itmo287659");
    })
    .use((error, req, res, next) =>
      res.status(500).set(CORS).send(`Error : ${error}`)
    );

  return app;
};

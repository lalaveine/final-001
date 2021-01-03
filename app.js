const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers":
    "x-test,Content-Type,Accept, Access-Control-Allow-Headers",
};

function myFunc(express, bodyParser, createReadStream, crypto, http) {
  const app = express();

  app.port = process.env.PORT || 4321;

  app
    .use((req, res, next) => {
      res.set(CORS);
      next();
    })
    .use(bodyParser.urlencoded({ extended: true }))
    .get("/sha1/:input", (req, res) => {
      let hash = crypto.createHash("sha1");
      hash.update(req.params.input);
      res.send(hash.digest("hex"));
    })

    .get("/login/", (req, res) => res.send("yuriiitymchenko"))
    .get("/code/", (req, res) => {
      let filename = import.meta.url.substring(7);
      createReadStream(filename).pipe(res);
    });

  app.all("/req/", (req, res) => {
    let url = req.query.addr;
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
  app.all("*", (req, res) => {
    res.send("yuriiitymchenko");
  });
  return app;
}

export default myFunc;

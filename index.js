require("http")
  .Server((req, res) => {
    const NAME = "itmo287659";
    const CORS = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Access-Control-Allow-Headers":
        "x-test,Content-Type,Accept,Access-Control-Allow-Headers",
    };
    const result = {
      message: NAME,
      "x-result": req.headers["x-test"],
      "x-body": "",
    };
    if (req.url === "/result4/") {
      let body = "";

      req
        .on("data", (data) => {
          body += data;
          result["x-body"] = body;
          return result;
        })
        .on("end", () => {
          res.writeHead(200, {
            ...CORS,
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify(result));
        });
    } else {
      res.writeHead(200, { ...CORS, "Content-Type": "application/json" });

      res.end(JSON.stringify(result));
    }
  })
  .listen(process.env.PORT);

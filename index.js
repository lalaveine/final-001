require("http")
  .Server((req, res) => {
    const CORS = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,DELETE",
      "Access-Control-Allow-Headers":
        "Content-Type, Access-Control-Allow-Headers",
    };
    res.writeHead(200, CORS);
    if (req.url === "/v8") return res.end(process.versions.v8);
    if (req.url === "/package.json")
      return require("fs").createReadStream("./package.json").pipe(res);
    if (req.url === "/day") return res.end(`${new Date().getDate()}`);
    if (req.url.includes("/mirror?x="))
      return res.end(req.url.replace("/mirror?x=", ""));

    res.end("evgeniimatveev");
  })
  .listen(process.env.PORT);

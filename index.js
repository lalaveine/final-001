require("http")
  .Server((req, res) => {
    const NAME = "itmo287659";
    const CORS = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Access-Control-Allow-Headers":
        "X-Author,Content-Type,Accept,Access-Control-Allow-Headers",
    };

    const HEADERS = {
      "X-Author": NAME,
      "Content-Type": "text/plain; charset=UTF-8",
    };
    const FUNCT = "function task(x) {\n\treturn Math.pow(x,this);\n}";
    res.writeHead(200, { ...CORS, ...HEADERS });
    if (req.url === "/login") return res.end(NAME);
    if (req.url === "/sample") return res.end(FUNCT);
    // if (req.url === "/package.json")
    //   return require("fs").createReadStream("./package.json").pipe(res);
    // if (req.url === "/day") return res.end(`${new Date().getDate()}`);
    // if (req.url.includes("/mirror?x="))
    //   return res.end(req.url.replace("/mirror?x=", ""));

    res.end(NAME);
  })
  .listen(process.env.PORT);

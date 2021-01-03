const [{ Server: h1 }, x] = [require("http"), require("express")];

const ApiRouter = require("./routes/api");
const Api2Router = require("./routes/api2");

const Router = x.Router();
const { log } = console;
const hu = { "Content-Type": "text/html; charset=utf-8" };
const app = x();
const mw0 = (r, rs, n) => rs.status(200).set(hu) && n();

Router.route("/").get((r) => r.res.end("I am happy to see you again!"));

app
  .use(mw0)
  .use(function workingSetter(req, res, next) {
    req.working = "Работает, ура!";
    next();
  })
  .use(x.static("."))
  .use("/", Router)
  .use("/api", ApiRouter(x))
  .use("/api2", Api2Router(x))
  .get("/first", (req, res, next) => {
    req.app._router.stack.forEach((mw) => console.log(mw.name));
    if (req.query.error == "yes") return next();
    res.send(req.working);
  })
  .use((req, res, next) => {
    req.errorMessage = "Всё ещё нет";
    next();
  })
  .use((r) => r.res.status(404).set(hu).send(r.errorMessage))
  .use((e, r, rs, n) => rs.status(500).set(hu).send(`Ошибка: ${e}`))
  /* .set('view engine', 'pug') */
  .set("x-powered-by", false);
module.exports = h1(app).listen(process.env.PORT);

/*
для варианта с type="module"
import { Server } from 'http';
import x from 'express';
и в предпоследней строке
export default Server(app)
*/

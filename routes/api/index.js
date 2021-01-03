module.exports = (x) => {
  const router = x.Router();
  router.route('/').get((r) => r.res.send('Matn: add, multy'));

  router
    .route('/add/:n1/:n2')
    .get((r) => {
      let sum = Number(r.params.n1) + Number(r.params.n2);
      r.res.format({
        'application/json': () => r.res.json({ result: 'Working well' }),
        'text/html': r.res.send(`<h2>Got: ${sum}</h2>`),
      });
    })
    .post((r) =>
      r.res.send(`Posted : ` + (Number(r.params.n1) + Number(r.params.n2)))
    );

  router
    .route('/multy/:n1/:n2')
    .get((r) => r.res.send(`Got : ` + r.params.n1 * r.params.n2))
    .post((r) => r.res.send(`Posted : ` + r.params.n1 * r.params.n2));

  return router;
};

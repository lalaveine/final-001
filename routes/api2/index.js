module.exports = (x) => {
  const router = x.Router();
  router.all('/', (r) => {
    router.all(/hello/, (r) => r.res.send('hello'));
    r.res.send('Not working yet');
  });

  return router;
};

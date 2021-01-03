import express from "express";
import bodyParser from "body-parser";
import puppeteer from "puppeteer";
import { createReadStream } from "fs";
import crypto from "crypto";
import http from "http";
import mongoose from "mongoose";
import myFunc from "./app.js";
import CORS from "./CORS.js";
import UserModel from "./models/User.js";

const app = express();

app.use((req, res, next) => {
  res.set(CORS);
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/login/", (req, res) => {
  res.end("itmo287659");
});

app.get("/test/", async (req, res) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(req.query.URL);
  await page.waitForSelector("#bt");
  await page.click("#bt");
  const got = await page.$eval("#inp", (el) => el.value);
  res.end(got);
});

app.listen(process.env.PORT || 9000);

import bodyParser from "body-parser";
import express from "express";
import { createReadStream } from "fs";
import crypto from "crypto";
import http from "http";

import myFunc from "./app.js";

const app = myFunc(express, bodyParser, createReadStream, crypto, http);

app.listen(app.port);

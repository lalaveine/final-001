import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import crypto from 'crypto';
import http from 'http';

import myFunc from './app.js';

const app = myFunc(express, bodyParser, fs, crypto, http);

app.listen(app.port);

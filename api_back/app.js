import { fileURLToPath } from "url";
import path from "path";
import 'dotenv/config';
import express from 'express';
import session from "express-session";
import { mySession } from "./config/session.js";
import sessionByDefault from "./config/session.js"
import router from "./routes/index.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || process.env.SERVER_LOCAL_PORT;


// app.set('views', './views');
// app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(mySession))
app.use(sessionByDefault);

app.use(router)


app.listen(PORT, () => {
   console.log(`Listening a http://localhost:${PORT}`);
});



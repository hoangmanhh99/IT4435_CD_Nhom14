var express = require('express');
const cors = require('cors');
require('colors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const moderatorRouter = require('./routes/moderatorRouter');
const singerRouter = require('./routes/singerRouter');
const userRouter = require('./routes/userRouter');
const itemRouter = require('./routes/itemRouter');
const categoryRouter = require('./routes/categoryRouter');
const albumRouter = require('./routes/albumRouter');
const songRouter = require('./routes/songRouter');
const historyRouter = require('./routes/historyRouter');
const exceptionHandler = require('./middlewares/exceptionHandler');

var connectDB = require('./connect');
const initial = require('./utils/initialRole');


connectDB();
 

var app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// require('./routes/index')(app);

app.use(moderatorRouter);
app.use(singerRouter);
app.use(userRouter);
app.use(itemRouter);
app.use(categoryRouter);
app.use(albumRouter);
app.use(songRouter);
app.use(historyRouter);

// catch global exception
app.use(exceptionHandler);

// bat loi nhap sai url
app.all('*', (req, res) => {
    res.status(404).json({
      status: '0',
      message: `Can't find ${req.originalUrl} on this server!`
    });
});



initial();
module.exports = app;
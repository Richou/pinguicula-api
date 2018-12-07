import app from './app';
import http =  require('http');
const PORT = process.env.SERVER_PORT || 3000;

http.createServer(app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
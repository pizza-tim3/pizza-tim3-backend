// require('dotenv').config();
const server = require('./server');
const PORT = process.env.PORT || 5000;

// Check if server is running successfully
server.listen(PORT, () => {
    console.log(`Listening to localhost: ${PORT}`);
});



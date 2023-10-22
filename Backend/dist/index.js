import app from './app.js';
import { connectToDatabase } from './db/connection.js';
// Connection and Listener
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log('Server Running on PORT', PORT, '\nSuccessfully connected to database!'));
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map
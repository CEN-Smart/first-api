import app from './main';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT!;

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

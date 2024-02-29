import mongoose, { Connection } from 'mongoose';
const MONGO_URI = process.env.MONGO_URI || '';
let cachedConnection: Connection | null = null;

async function connectDB(): Promise<Connection> {
	if (cachedConnection) {
		return cachedConnection;
	}

	if (!MONGO_URI) {
		throw new Error('MongoDB URI is not defined in environment variables');
	}

	const opts = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	try {
		const connection = await mongoose.connect(MONGO_URI, opts as mongoose.ConnectOptions);
		cachedConnection = connection.connection;
		console.log('Connected to MongoDB');
		return cachedConnection;
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		throw error; // Rethrow the error to be handled by the caller
	}
}

// function disconnectDB(): Connection | void {
// 	if (!cachedConnection) {
// 		return;
// 	}
// 	mongoose.disconnect();
// }

export { connectDB };

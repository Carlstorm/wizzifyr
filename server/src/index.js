// Imports environment variables from a .env file
import "dotenv/config";
import createServer from "./server.js";
import { connectDatabase, seedUsers, seedWishes } from "./database.js";

const appName = "Server API";
const port = process.env.PORT || 8080;

async function main() {
  try {
    await connectDatabase();
    await seedUsers();
    await seedWishes();
    const server = createServer();
    server.listen(port, () =>
      console.log(`${appName} running on port ${port}!`)
    );
  } catch (error) {
    console.error(error);
  }
}

main();

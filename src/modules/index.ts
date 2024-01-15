import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";

const modules = [DatabaseModule, ConfigModule];

export { modules };

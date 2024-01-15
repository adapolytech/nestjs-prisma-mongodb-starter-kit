import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./databases/database.module";

const modules = [DatabaseModule, ConfigModule];

export { modules };

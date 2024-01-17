import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";

const modules = [DatabaseModule, ConfigModule, UsersModule];

export { modules };

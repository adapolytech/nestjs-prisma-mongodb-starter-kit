import { Static, Type } from "@sinclair/typebox";
import { Check } from "@sinclair/typebox/value";

const EnvSchema = Type.Object({
  ENV: Type.String(),
  DATABASE_URL: Type.String(),
  JWT_SECRET: Type.String(),
  RESEND_API_KEY: Type.String()
});

const EnvSchemaValidation = (env_vars: Record<string, any>) => {
  const check = Check(EnvSchema, env_vars);
  if (!check) throw new Error("Environment variables are required to bootstrap this project");
  return env_vars;
};

type EnvSchema = Static<typeof EnvSchema>;

export { EnvSchema, EnvSchemaValidation };

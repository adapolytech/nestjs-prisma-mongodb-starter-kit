import { Static, Type } from "@sinclair/typebox";
import { Check } from "@sinclair/typebox/value";

const EnvSchema = Type.Object({
  PORT: Type.String({ default: "4004" }),
  ENV: Type.String(),
  DATABASE_URL: Type.String(),
  JWT_SECRET: Type.String(),
  RESEND_API_KEY: Type.Optional(Type.String()),
  SERVICE_PREFIX: Type.Optional(Type.String({ default: "api" }))
});

const EnvSchemaValidation = (env_vars: Record<string, any>) => {
  const check = Check(EnvSchema, env_vars);
  if (!check) throw new Error("Environment variables are required to bootstrap this project");
  return env_vars;
};

type EnvSchema = Static<typeof EnvSchema>;

export { EnvSchema, EnvSchemaValidation };

export const configProvider = {
  provide: 'CONFIG',
  useFactory: (): AppConfig => ({
    database: {
      driver: process.env.DATABASE_DRIVER ?? 'memory',
      url: process.env.DATABASE_URL ?? '',
    },
  }),
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

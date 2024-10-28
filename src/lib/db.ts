import { openDB } from 'idb';

const DB_NAME = 'dashboard-db';
const DB_VERSION = 1;

export interface DataSource {
  id?: number;
  name: string;
  url: string;
  createdAt: Date;
}

export interface DataPoint {
  id?: number;
  sourceId: number;
  data: unknown;
  cachedAt: Date;
}

export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('dataSources')) {
        const dataSourceStore = db.createObjectStore('dataSources', {
          keyPath: 'id',
          autoIncrement: true,
        });
        dataSourceStore.createIndex('name', 'name', { unique: true });
      }

      if (!db.objectStoreNames.contains('dataPoints')) {
        const dataPointsStore = db.createObjectStore('dataPoints', {
          keyPath: 'id',
          autoIncrement: true,
        });
        dataPointsStore.createIndex('sourceId', 'sourceId');
      }
    },
  });
  return db;
};

export const db = initDB();

export const addDataSource = async (dataSource: Omit<DataSource, 'id' | 'createdAt'>) => {
  const database = await db;
  return database.add('dataSources', {
    ...dataSource,
    createdAt: new Date(),
  });
};

export const getDataSources = async () => {
  const database = await db;
  return database.getAll('dataSources');
};

export const getDataSourceByName = async (name: string) => {
  const database = await db;
  const tx = database.transaction('dataSources', 'readonly');
  const index = tx.store.index('name');
  return index.get(name);
};

export const addDataPoint = async (sourceId: number, data: unknown) => {
  const database = await db;
  return database.add('dataPoints', {
    sourceId,
    data,
    cachedAt: new Date(),
  });
};

export const getDataPoints = async (sourceId: number) => {
  const database = await db;
  const tx = database.transaction('dataPoints', 'readonly');
  const index = tx.store.index('sourceId');
  return index.getAll(sourceId);
};
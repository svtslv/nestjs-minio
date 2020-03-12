import { MinioModuleOptions, MinioClient } from "./minio.interfaces";
import * as MinioJS from 'minio';
import {
  MINIO_MODULE_CONNECTION,
  MINIO_MODULE_CONNECTION_TOKEN,
  MINIO_MODULE_OPTIONS_TOKEN
} from './minio.constants';

export function getMinioOptionsToken(connection: string): string {
  return `${ connection || MINIO_MODULE_CONNECTION }_${ MINIO_MODULE_OPTIONS_TOKEN }`;
}

export function getMinioConnectionToken(connection: string): string {
  return `${ connection || MINIO_MODULE_CONNECTION }_${ MINIO_MODULE_CONNECTION_TOKEN }`;
}

export function createMinioConnection(options: MinioModuleOptions): MinioClient {
  const { config } = options;

  if (config.url) {
    const url = new URL(config.url);
    config.port = parseInt(url.port);
    config.endPoint = url.hostname;
    config.useSSL = url.protocol === 'https:';
    config.accessKey = url.username;
    config.secretKey = url.password;
  }

  delete config.url;
  return new MinioJS.Client(config as any);
}

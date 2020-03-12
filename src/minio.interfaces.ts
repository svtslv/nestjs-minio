import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import * as MinioJS from 'minio';

export type MinioClient = MinioJS.Client;

export interface MinioModuleOptions {
  config: Partial<MinioJS.ClientOptions> & { url?: string }
}

export interface MinioModuleOptionsFactory {
  createMinioModuleOptions(): Promise<MinioModuleOptions> | MinioModuleOptions;
}

export interface MinioModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<MinioModuleOptionsFactory>;
  useExisting?: Type<MinioModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MinioModuleOptions> | MinioModuleOptions;
}

import { DynamicModule, Module } from '@nestjs/common';
import { MinioCoreModule } from './minio.core-module';
import { MinioModuleAsyncOptions, MinioModuleOptions } from './minio.interfaces';

@Module({})
export class MinioModule {
  public static forRoot(options: MinioModuleOptions, connection?: string): DynamicModule {
    return {
      module: MinioModule,
      imports: [MinioCoreModule.forRoot(options, connection)],
      exports: [MinioCoreModule],
    };
  }

  public static forRootAsync(options: MinioModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: MinioModule,
      imports: [MinioCoreModule.forRootAsync(options, connection)],
      exports: [MinioCoreModule],
    };
  }
}

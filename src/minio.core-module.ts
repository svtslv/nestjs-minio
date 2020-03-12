import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import { MinioModuleAsyncOptions, MinioModuleOptions, MinioModuleOptionsFactory } from './minio.interfaces';
import { createMinioConnection, getMinioOptionsToken, getMinioConnectionToken } from './minio.utils'

@Global()
@Module({})
export class MinioCoreModule {

  /* forRoot */
  static forRoot(options: MinioModuleOptions, connection?: string): DynamicModule {

    const minioOptionsProvider: Provider = {
      provide: getMinioOptionsToken(connection),
      useValue: options,
    };

    const minioConnectionProvider: Provider = {
      provide: getMinioConnectionToken(connection),
      useValue: createMinioConnection(options),
    };

    return {
      module: MinioCoreModule,
      providers: [
        minioOptionsProvider,
        minioConnectionProvider,
      ],
      exports: [
        minioOptionsProvider,
        minioConnectionProvider,
      ],
    };
  }

  /* forRootAsync */
  public static forRootAsync(options: MinioModuleAsyncOptions, connection: string): DynamicModule {

    const minioConnectionProvider: Provider = {
      provide: getMinioConnectionToken(connection),
      useFactory(options: MinioModuleOptions) {
        return createMinioConnection(options)
      },
      inject: [getMinioOptionsToken(connection)],
    };

    return {
      module: MinioCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options, connection), minioConnectionProvider],
      exports: [minioConnectionProvider],
    };
  }

  /* createAsyncProviders */
  public static createAsyncProviders(options: MinioModuleAsyncOptions, connection?: string): Provider[] {

    if(!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useExisting || options.useFactory) {
      return [
        this.createAsyncOptionsProvider(options, connection)
      ];
    }

    return [ 
      this.createAsyncOptionsProvider(options, connection), 
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  /* createAsyncOptionsProvider */
  public static createAsyncOptionsProvider(options: MinioModuleAsyncOptions, connection?: string): Provider {

    if(!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useFactory) {
      return {
        provide: getMinioOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: getMinioOptionsToken(connection),
      async useFactory(optionsFactory: MinioModuleOptionsFactory): Promise<MinioModuleOptions> {
        return await optionsFactory.createMinioModuleOptions();
      },
      inject: [options.useClass || options.useExisting],
    };
  }
}
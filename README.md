# NestJS Minio

<a href="https://www.npmjs.com/package/@svtslv/nestjs-minio"><img src="https://img.shields.io/npm/v/@svtslv/nestjs-minio" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@svtslv/nestjs-minio"><img src="https://img.shields.io/npm/l/@svtslv/nestjs-minio" alt="Package License" /></a>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Examples](#examples)
- [License](#license)

## Description
Integrates Minio with Nest

## Installation

```bash
npm install @svtslv/nestjs-minio minio
```

```bash
npm install -D @types/minio
```

You can also use the interactive CLI

```sh
npx nestjs-modules
```

## Examples

```bash
docker run \
-p 9000:9000 \
-e MINIO_ACCESS_KEY=minio \
-e MINIO_SECRET_KEY=password \
minio/minio server /data
```

### MinioModule.forRoot(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { MinioModule } from '@svtslv/nestjs-minio';
import { AppController } from './app.controller';

@Module({
  imports: [
    MinioModule.forRoot({
      config: {
        // url: 'http://minio:password@localhost:9000',
        accessKey: 'minio',
        secretKey: 'password',
        endPoint: 'localhost',
        port: 9000,
        useSSL: false,
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### MinioModule.forRootAsync(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { MinioModule } from '@svtslv/nestjs-minio';
import { AppController } from './app.controller';

@Module({
  imports: [
    MinioModule.forRootAsync({
      useFactory: () => ({
        config: {
          // url: 'http://minio:password@localhost:9000',
          accessKey: 'minio',
          secretKey: 'password',
          endPoint: 'localhost',
          port: 9000,
          useSSL: false,
        },
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### InjectMinioClient(connection?)

```ts
import { Controller, Get, } from '@nestjs/common';
import { InjectMinioClient, MinioClient } from '@svtslv/nestjs-minio';

@Controller()
export class AppController {
  constructor(
    @InjectMinioClient() private readonly minioClient: MinioClient,
  ) {}

  @Get()
  async getHello() {
    if(!await this.minioClient.bucketExists('bucket2')) {
      await this.minioClient.makeBucket('bucket2', '');
    }

    return await this.minioClient.listBuckets()
  }
}
```

## License

MIT

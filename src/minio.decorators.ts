import { Inject } from '@nestjs/common';
import { getMinioConnectionToken } from './minio.utils';

export const InjectMinioClient = (connection?: string) => {
  return Inject(getMinioConnectionToken(connection));
};

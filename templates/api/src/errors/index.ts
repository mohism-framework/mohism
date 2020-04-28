import { HTTP_STATUS, MohismError } from '@mohism/core';

const { NotFound } = HTTP_STATUS;

export const ErrUserNotFound = new MohismError('user not found')
  .setStatus(NotFound)
  .setSeq(1);

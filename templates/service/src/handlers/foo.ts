import { useModel } from '@mohism/core';
import { ErrUserNotFound } from '../errors';

export default async (minAge: number = 18) => {

  const row = await useModel('foo').findOne(
    {
      age: {
        $gte: minAge,
      },
    }
  );
  if (!row) {
    throw ErrUserNotFound;
  }
  return row;
};
import bcrypt from 'bcrypt';

const SALT_ROUNDS = Number(process.env['BCRYPT_SALT_ROUNDS']) || 12;

export const hashSecret = ( plainText: string ): string => {
  return bcrypt.hashSync(plainText, SALT_ROUNDS);
};

export const compareSecret = ( plainText: string, hash: string ): Promise<boolean> =>
{
  return bcrypt.compare(plainText, hash);
}

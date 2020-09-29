import { db } from '.';

describe('DB test', () => {
  it('No force true', () => {
    expect(db.options.force).toBe(false);
  });
});

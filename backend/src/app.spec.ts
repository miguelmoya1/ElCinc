import { PROD } from './app.constants';

describe('APP test', () => {
  it('PROD must be true', () => {
    expect(PROD).toBe(true);
  });
});

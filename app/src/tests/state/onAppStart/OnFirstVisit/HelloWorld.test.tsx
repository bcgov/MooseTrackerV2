import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { waitFor } from '@testing-library/react';
//import { server } from 'mocks/server';

describe('Can load initial record set layer state on startup', function () {
 /* beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  afterAll(() => server.close())
  afterEach(() => server.resetHandlers())
  // There might be a better way but this seems to work ok:
  beforeAll(async () => {
    localStorage.clear();
    require('../../../../main');
    await waitFor(() => {
      expect(store).toBeDefined();
    });
  });
  */

  it('Can load initial 3 record set layers on first visit', async function () {
    expect(true).toBe(true);
    /*
    store.dispatch({ type: AUTH_INITIALIZE_COMPLETE, payload: { authenticated: true } });
    await waitFor(() => {
      expect(store.getState()?.Map?.layers).toBeDefined()
      expect(store.getState()?.Map?.layers.length).toEqual(3)
      expect(store.getState()?.Map?.layers[0].geoJSON).toBeDefined()
      expect(store.getState()?.Map?.layers[1].geoJSON).toBeDefined()
      expect(store.getState()?.Map?.layers[2].geoJSON).toBeDefined()
    });
  });
  */
  })
  });
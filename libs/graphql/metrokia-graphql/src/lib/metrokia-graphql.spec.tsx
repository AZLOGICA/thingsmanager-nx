import { render } from '@testing-library/react';

import MetrokiaGraphql from './metrokia-graphql';

describe('MetrokiaGraphql', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MetrokiaGraphql />);
    expect(baseElement).toBeTruthy();
  });
});

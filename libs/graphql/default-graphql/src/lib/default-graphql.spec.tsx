import { render } from '@testing-library/react';

import DefaultGraphql from './default-graphql';

describe('DefaultGraphql', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DefaultGraphql />);
    expect(baseElement).toBeTruthy();
  });
});

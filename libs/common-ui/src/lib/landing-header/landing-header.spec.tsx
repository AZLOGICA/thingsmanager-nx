import { render } from '@testing-library/react';

import LandingHeader from './landing-header';

describe('LandingHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingHeader />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import LandingCard from './landing-card';

describe('LandingCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingCard />);
    expect(baseElement).toBeTruthy();
  });
});

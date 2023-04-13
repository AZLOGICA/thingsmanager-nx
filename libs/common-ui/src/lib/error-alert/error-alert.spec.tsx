import { render } from '@testing-library/react';

import ErrorAlert from './error-alert';

describe('ErrorAlert', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorAlert />);
    expect(baseElement).toBeTruthy();
  });
});

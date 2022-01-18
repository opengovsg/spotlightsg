import { render, screen, waitFor } from '@testing-library/react'

import { App } from '../App'

test('renders page', async () => {
  render(<App />)

  await waitFor(async () =>
    expect(
      await screen.findByText('This is a mock login page'),
    ).toBeInTheDocument(),
  )
})

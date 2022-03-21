import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';
import { Users } from './interfaces/users';

const server = setupServer(
  rest.get<Users>('https://randomuser.me/api/', (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            name: {
              title: 'Mr',
              first: 'Cameron',
              last: 'Li',
            },
            picture: {
              large: 'https://randomuser.me/api/portraits/men/53.jpg',
              medium: 'https://randomuser.me/api/portraits/med/men/53.jpg',
              thumbnail: 'https://randomuser.me/api/portraits/thumb/men/53.jpg',
            },
            login: { uuid: '3fa85458-7dbb-4892-8c71-86680dcf96ba' },
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('App', () => {
  beforeEach(async () => {
    render(<App />);
  });
  test('render users on load and on click', async () => {
    const button = screen.getByRole('button', { name: 'fetch more' });

    expect(button).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'), {
      timeout: 2000,
    });

    expect(await screen.findByTestId('test-0'));

    user.click(button);

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'), {
      timeout: 4000,
    });

    expect(await screen.findByTestId('test-1'));
  });
});

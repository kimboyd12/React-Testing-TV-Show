import React from 'react';
import App from './App';
import {render, waitFor, fireEvent, wait} from '@testing-library/react';
import {fetchShow as mockFetchShow} from './api/fetchShow';

jest.mock('./api/fetchShow');

test('App fetches show data and renders it', async () => {
    mockFetchShow.mockResolvedValueOnce(mockData);
    const {queryAllByText} = render(<App />);

    const fetching = queryAllByText(/fetching data.../i)
    expect(fetching).toHaveLength(1);
    
    await waitFor(() => {
        const summary = queryAllByText(/summary/i);
        expect(summary).toHaveLength(1);
    })
})


const mockData = {
    image: { original: "original" },
    name: "name",
    summary: "<p>summary</p>",
    _embedded: {
      episodes: [
        {
          id: "1",
          image: { medium: "medium_image" },
          name: "name",
          season: 3,
          number: 2,
          summary: "<p>Summary</p>",
          runtime: 20,
        },
      ],
    },
  };
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Home from './Home'

const mockedTooManyResults = {
  Response: 'False',
  Error: 'Too many results.',
}

const mockedMovieNotFound = {
  Response: 'False',
  Error: 'Movie not found!',
}

const mockedValidMoviesResponse = {
  Search: [
    {
      Title: 'Star Wars: Episode IV - A New Hope',
      Year: '1977',
      imdbID: 'tt0076759',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    },
    {
      Title: 'Star Wars: Episode V - The Empire Strikes Back',
      Year: '1980',
      imdbID: 'tt0080684',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    },
    {
      Title: 'Star Wars: Episode VI - Return of the Jedi',
      Year: '1983',
      imdbID: 'tt0086190',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    },
    {
      Title: 'Star Wars: Episode VII - The Force Awakens',
      Year: '2015',
      imdbID: 'tt2488496',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg',
    },
    {
      Title: 'Star Wars: Episode I - The Phantom Menace',
      Year: '1999',
      imdbID: 'tt0120915',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    },
    {
      Title: 'Star Wars: Episode III - Revenge of the Sith',
      Year: '2005',
      imdbID: 'tt0121766',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg',
    },
    {
      Title: 'Star Wars: Episode II - Attack of the Clones',
      Year: '2002',
      imdbID: 'tt0121765',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg',
    },
    {
      Title: 'Star Trek',
      Year: '2009',
      imdbID: 'tt0796366',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjE5NDQ5OTE4Ml5BMl5BanBnXkFtZTcwOTE3NDIzMw@@._V1_SX300.jpg',
    },
    {
      Title: 'Star Wars: Episode VIII - The Last Jedi',
      Year: '2017',
      imdbID: 'tt2527336',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg',
    },
    {
      Title: 'Rogue One: A Star Wars Story',
      Year: '2016',
      imdbID: 'tt3748528',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg',
    },
  ],
  totalResults: '2941',
  Response: 'True',
}

describe('searching movies', () => {
  it('should give too many results error for too general search term', async () => {
    const vagueSearchTerm = 'a'

    const { getByTestId, findByTestId } = render(<Home />)

    const searchInput = getByTestId('search-input')

    expect(getByTestId('loading')).toHaveTextContent('Loading data...')

    fireEvent.change(searchInput, { target: { value: vagueSearchTerm } })

    const errorElement = await findByTestId('error')

    expect(errorElement).toHaveTextContent('Too many results.')
  })

  it('should give movie not found error when no movies were found', async () => {
    const notFoundSearchTerm = 'aasFFDDdDDffsDFDDff'

    const { getByTestId, findByTestId } = render(<Home />)

    const searchInput = getByTestId('search-input')

    expect(getByTestId('loading')).toHaveTextContent('Loading data...')

    fireEvent.change(searchInput, { target: { value: notFoundSearchTerm } })

    const errorElement = await findByTestId('error')

    expect(errorElement).toHaveTextContent('Movie not found!')
  })

  it('should fetch a list of movies from api', async () => {
    const validSearchTerm = 'star'

    const { getByTestId, findByTestId } = render(<Home />)

    const searchInput = getByTestId('search-input')

    expect(getByTestId('loading')).toHaveTextContent('Loading data...')

    fireEvent.change(searchInput, { target: { value: validSearchTerm } })

    const returnedMovies = await findByTestId('movie')

    expect(returnedMovies).toHaveLength(mockedValidMoviesResponse.Search.length)

    const movieList = await findByTestId('movie-list')

    expect(movieList).toMatchInlineSnapshot()
  })
})

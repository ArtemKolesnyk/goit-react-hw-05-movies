import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies } from 'services/apiTMDB';
import { Container, MoviesList } from 'components/Layout/Layout.styled';

const Home = () => {
  const [movieTrand, setMovieTrend] = useState([]);
  useEffect(() => {
    (async function getMovies() {
      const res = await getTrendingMovies();
      const movies = res.data.results;
      if (movies) {
        setMovieTrend(movies);
      }
    })();
    return () => {};
  }, []);

  return (
    <Container>
      <h1>Trending today</h1>
      <MoviesList>
        {movieTrand.map(({ id, name, title }) => (
          <li key={id}>
            <Link to={`movies/${id}`} key={id}>
              {title} {name}
            </Link>
          </li>
        ))}
      </MoviesList>
    </Container>
  );
};
export default Home;

import { Suspense, useState, useEffect, useRef } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi';

import {
  Container,
  MoreInfoLink,
  MoreInfoList,
  Box,
  GoBack,
} from '../../components/Layout/Layout.styled';
import { getInfoMovies } from 'services/apiTMDB';
import AboutMovie from 'components/AboutMovie';
import { EventsLoader } from 'components/Loader/Loader';

const MovieDetails = () => {
  const [movieInfo, setMovieInfo] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    (async function aboutMovie() {
      const res = await getInfoMovies(movieId);
      if (res.data.length === 0) {
        return;
      }
      setMovieInfo(res.data);
      setIsLoading(false);
    })();

    return () => {};
  }, [movieId]);

  return (
    <Container>
      <GoBack to={backLinkHref.current ?? '/'}>
        <HiChevronLeft />
        Go back
      </GoBack>

      {isLoading && <EventsLoader />}
      {!isLoading && <AboutMovie movieInfo={movieInfo} />}

      <Box>
        <p>Additional information</p>
        <MoreInfoList>
          <li>
            <MoreInfoLink to={'cast'}>Cast</MoreInfoLink>
          </li>
          <li>
            <MoreInfoLink to={'reviews'}>Reviews</MoreInfoLink>
          </li>
        </MoreInfoList>
      </Box>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default MovieDetails;

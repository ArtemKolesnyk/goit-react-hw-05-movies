import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getReviews } from 'services/apiTMDB';
import { ReviewsInfoList } from './Reviews.styled';
import { DataTable } from 'components/Loader/Loader';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviewsInfo, setReviewsInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    (async function reviewsInfo() {
      const res = await getReviews(movieId);
      setReviewsInfo(res.data.results);
      setIsLoading(false);
    })();

    return () => {};
  }, [movieId]);

  return (
    <>
      {isLoading && <DataTable />}
      {!isLoading && (
        <ReviewsInfoList>
          {reviewsInfo.map(({ id, author, content }) => (
            <li key={id}>
              <p>
                <b>Author: </b>
                {author}
              </p>
              <p>{content}</p>
            </li>
          ))}
        </ReviewsInfoList>
      )}
      {!isLoading && reviewsInfo.length === 0 && (
        <div>We don`t have information for this movie</div>
      )}
    </>
  );
};

export default Reviews;

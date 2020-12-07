import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const AboutMovie = () => {
  const [trailer, setTrailer] = useState(null);

  const params = useParams();

  const api = `5193ab5a3642f863333b0992eb6a8a01`;
  const url = `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${api}&language=en-US`;

  // const baseUrl = `https://image.tmdb.org/t/p/w500`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("result", data.results);
        console.log(data.results[0].key);
        setTrailer(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url]);

  return (
    <>
      {trailer ? (
        <>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer[0].key}`}
          />
          <h1>{`${trailer[0].name}`}</h1>
        </>
      ) : (
        <h1>No Trailer :((((</h1>
      )}
    </>
  );
};

export default AboutMovie;

import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import PaginationBar from "../components/PaginationBar";
import SearchForm from "../components/SearchForm";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  const api = `5193ab5a3642f863333b0992eb6a8a01`;
  let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api}&language=en-US&page=${pageNum}`;

  const baseUrl = `https://image.tmdb.org/t/p/w500`;

  const jumpToAbout = (id) => {
    history.push(`/movies/${id}`);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (query) {
          let term = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${query}`;
          url = term;
        }

        console.log("query", query);
        let res = await fetch(url);
        let data = await res.json();
        console.log("data", data);
        setMovies(data.results);
        setTotalPageNum(data.total_pages);
        setPageNum(data.page);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [pageNum, query]);
  console.log("movies1", movies);

  return (
    <>
      <SearchForm
        loading={loading}
        searchInput={searchInput}
        handleSearchChange={handleSearchInputChange}
        handleSubmit={handleSubmit}
      />

      <ul className="d-flex flex-wrap ">
        {movies &&
          movies.map((movie) => {
            return (
              <li
                className="wrapper"
                style={{ width: "18rem" }}
                onClick={() => jumpToAbout(movie.id)}
                key={movie.id}
              >
                <div className="card ml-3 mt-5">
                  <img src={`${baseUrl}${movie.poster_path}`} alt="" />
                  <div className="info">
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <div className="d-flex justify-content-center">
        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
        />
      </div>
    </>
  );
};

export default Home;

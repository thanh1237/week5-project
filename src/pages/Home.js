import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import SearchForm from "../components/SearchForm";
import api from "../apiService";

const baseUrl = `https://image.tmdb.org/t/p/w500`;

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

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
        let url = `movie/now_playing?language=en-US&page=${pageNum}`;
        if (query) url = `/search/movie?query=${query}`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        console.log("query", query);
        let res = await api.get(url);
        let data = res.data;
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

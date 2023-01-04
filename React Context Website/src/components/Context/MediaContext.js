import axios from "axios";
import { createContext, useState, useEffect } from "react";

export let MediaContext = createContext("");

export default function MediaContextProvider(props) {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingPeople, setTrendingPeople] = useState([]);
    const [trendingTvs, setTrendingTvs] = useState([]);

    let getTrendingMovies = async () => {
        let { data } = await axios.get(
            "https://api.themoviedb.org/3/trending/movie/day?api_key=6d843156fee8cf6606eff5a68cb6706f"
        );
        console.log(data);
        setTrendingMovies(data.results);
    };

    let getTrendingTvs = async () => {
        let { data } = await axios.get(
            "https://api.themoviedb.org/3/trending/tv/day?api_key=6d843156fee8cf6606eff5a68cb6706f"
        );
        setTrendingTvs(data.results);
    };

    let getTrendingPeople = async () => {
        let { data } = await axios.get(
            "https://api.themoviedb.org/3/trending/person/day?api_key=6d843156fee8cf6606eff5a68cb6706f"
        );
        setTrendingPeople(data.results);
    };

    useEffect(() => {
        getTrendingMovies();
    }, []);

    useEffect(() => {
        getTrendingTvs();
    }, []);

    useEffect(() => {
        getTrendingPeople();
    }, []);

    return (
        <MediaContext.Provider
            value={{ trendingMovies, trendingPeople, trendingTvs }}
        >
            {props.children}
        </MediaContext.Provider>
    );
}

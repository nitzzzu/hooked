import React from 'react';

const Movie = ({ movie }) => {
    return (
        <div className="movie">
            <h2>{movie.title}</h2>
            <div>
                <img width="200" alt={`The movie titled: ${movie.title}`} src={movie.poster_path} />
            </div>
            <p>({movie.vote_average})</p>
        </div>
    );
};

export default Movie;

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
// import logo from '../images/logo1.png'
// import logo from '../images/logo2.png'
// import logo from '../images/logo3.png'
// import logo from '../images/logo4.png'
import logo from '../images/logo5.png'
// import logo from '../images/logo6.png'

const GET_EPISODE = gql`
  query GetEpisodeInfo($id: ID!) {
    episode(id: $id) {
      name
      episode
      air_date
      characters {
        name
        status
        species
        image
        gender
        origin {
          name
        }
        location {
          name
        }
      }
      id
      created
    }
  }
`;

const Episode = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EPISODE, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const episode = data.episode;
  const characters = episode.characters;

  return (
    <>
      <div className="mt-5 text-black">
        <div className="container-fluid mt-4 ">
          <div className=" row rows d-flex align-items-center">
            <div className="col-auto">
              <img
                className="imgs"
                src={logo}
                alt="Rick and Morty Logo"
                width="80"
              />
            </div>
            <div className="col-auto">
              <h2 className="text-black m-0">Rick and Morty Characters</h2>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-3">
          <div className="row">
            {characters.map((character) => {
              return (
                <div className="col-12 col-md-3 mt-5" key={character.id}>
                  <div className="card" style={{ width: "22rem" }}>
                    <img
                      src={character.image}
                      alt={character.name}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h4 className="card-title">{character.name}</h4>
                      <p className="card-text">Status: {character.status}</p>
                      <p className="card-text">Species: {character.species}</p>
                      <p className="card-text">
                        Location: {character.location.name}
                      </p>

                      <Link
                        to={`/characters/${id}`}
                        style={{ width: "100%" }}
                        className=" btn btn-primary butt"
                      >
                        Back to Character Info
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-5 text-center">
        <Link className="btn btn-primary butss" to="/">
          Home page
        </Link>
      </div>
    </>
  );
};

export default Episode;

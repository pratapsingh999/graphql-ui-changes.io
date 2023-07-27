import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import logo from '../images/logo1.png'
// import logo from '../images/logo2.png'
// import logo from '../images/logo3.png'
// import logo from '../images/logo4.png'
// import logo from '../images/logo5.png'
// import logo from '../images/logo6.png'


const GET_CHARACTERS = gql`
  query GetCharactersList {
    characters {
      results {
        id
        name
        status
        species
        image
        location {
          name
        }
      }
    }
  }
`;

const CharacterList = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredCharacters = data.characters.results.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="container-fluid mt-4">
        <div className="row rows d-flex align-items-center">
          <div className="col-auto">
            <img
              className="imgs"
              src={logo}
              alt="Rick and Morty Logo"
              width="60"
            />
          </div>
          <div className="col-auto">
            <h2 className="text-black m-0">Rick and Morty Characters</h2>
          </div>
        </div>
      </div>

      <div className="container">
        <form action="" className="search-bar">
          <input
            className="q"
            type="text"
            placeholder="Search character........"
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">
            <AiOutlineSearch />
          </button>
        </form>
      </div>

      <div className="container-fluid mt-3">
        <div className="row">
          {filteredCharacters.map((character) => {
            return (
              <div className="col-12 col-md-3 mt-5" key={character.id}>
                <div className="card" style={{ width: "22rem"}}>
                  <img
                    src={character.image}
                    alt={character.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h4 className="card-title">{character.name}</h4>
                    <p className="card-text">Status: {character.status}</p>
                    <p className="card-text">Species: {character.species}</p>
                    <p className="card-text">Location: {character.location.name}</p>
                    <Link className="btn btn-primary butt" style={{ width: "100%"}} to={`/characters/${character.id}`}>
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Audio } from 'react-loader-spinner'

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  const getUsers = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch('https://api.github.com/users/' + e.target.name.value);
    const data = await response.json();

    if (data.message) {
      setError(true);
    }

    setUser(data);
    setLoading(false);

    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  const goToProfile = (url) => {
    window.open(url, '_blank');
  }

  return (
    <main>

      <form onSubmit={getUsers}>
        <input type="text" name="name" placeholder="Search" />
        <input type="submit" value="Search" />
      </form>

      {user && user.login ? (
        <>
          {loading ? (
            <div className="loader">
              <Audio
                height="80"
                width="80"
                radius="9"
                color="#05386b"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </div>
          ) : (
            <div className='github-profile'>
              <div className='github-profile-image'>
                <Image unoptimized src={user.avatar_url} width={200} height={200} alt="Picture of the author" />
              </div>
              <div className='github-profile-review'>
                <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Username</th>
                      <th>Followers</th>
                      <th>following</th>
                      <th>Location</th>
                      <th>Repos</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#{user.id}</td>
                      <td>{user.login}</td>
                      <td>{user.followers}</td>
                      <td>{user.following}</td>
                      <td>{user.location}</td>
                      <td>{user.public_repos}</td>
                      <td>{user.type}</td>
                    </tr>
                  </tbody>
                </table>

                {user.html_url && (
                  <div className='github-profile-actions'>
                    <button onClick={() => goToProfile(user.html_url)}>GitHub Profile</button>
                  </div>
                )}
              </div>
            </div>
          )}

        </>


      ) : (
        <div className='search-github-user'>
          <hr />
          <h1>Search for a GitHub user</h1>
        </div>
      )}


      {error && (
        <div className='error-toast'>
          <h1 onClick={() => setError(false)}>GitHub user not found</h1>
        </div>
      )}

    </main>
  )
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Header() {
    const [searchInput, setSearchInput] = useState('');
    return (
        <header>

            <div>
                <form>
                    <input className="search-bar" type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                    {/* <Link to={`/search-results?search=${searchInput}`} className="custom-button" onClick={() => localStorage.setItem('searchInput', searchInput)} >
                    </Link> */}
                </form>

                <div className="links">
                    {/* <Link to='/Profile' className='user-fav'>
                        <div className="icon-container">
                            <span className="icon-caption">Profile</span>
                        </div>
                    </Link> */}
{/* 
                    <Link to='/saved' className='user-fav'>
                        <div className="icon-container">
                            <span className="icon-caption">Saved</span>
                        </div>

                    </Link> */}
                </div>
            </div>
        </header>
    );
};


export default Header;

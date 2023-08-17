import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Header() {
    const [searchInput, setSearchInput] = useState('');
    return (
        <header>

            <div>
                <form>
                    <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                    {/* <Link to={`/search-results?search=${searchInput}`}onClick={() => localStorage.setItem('searchInput', searchInput)} >
                    </Link> */}
                </form>

                <div className="links">
                    {/* <Link to='/Profile'>
                        <div>
                            <span>Profile</span>
                        </div>
                    </Link> */}
{/* 
                    <Link to='/saved'>
                        <div>
                            <span">Saved</span>
                        </div>

                    </Link> */}
                </div>
            </div>
        </header>
    );
};


export default Header;

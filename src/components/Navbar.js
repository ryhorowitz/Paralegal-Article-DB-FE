import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <div>
        <NavLink>Home</NavLink>
        <NavLink>Articles</NavLink>
        <NavLink>New Article</NavLink>
      </div>
    </nav>

  )
}

export default Navbar
import { Link } from 'react-router-dom';
import './navstyle.css';

function Navbar() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/test-page">Test Page</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;

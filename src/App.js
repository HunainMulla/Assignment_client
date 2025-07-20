import './styles/Global.css';
import Users from './Users.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProfileUser from './ProfileUser';

// Remove any existing global styles if they exist
const style = document.createElement('style');
style.textContent = `
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f7fa;
    color: #2c3e50;
  }
`;
document.head.appendChild(style);

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Users />,
    },
    { 
      path: "/users/:id",
      element: <ProfileUser />,
    }
  ]);

  return (
    <div className="app">
      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;

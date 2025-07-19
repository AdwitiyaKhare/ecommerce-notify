const Header = ({ user, onLogin, onLogout, darkMode, setDarkMode }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4 md:mb-0">
        E-Commerce Store
      </h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        {user ? (
          <div className="text-center md:text-left">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              {user.email}
            </p>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

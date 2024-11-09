import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router as AppRouter } from "./routes/Router";
import { fetchProfile } from "./components/profile_actions/ProfileActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
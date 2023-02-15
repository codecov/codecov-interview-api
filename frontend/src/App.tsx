import reactLogo from "./assets/react.svg";
import "./App.css";
import { z } from "zod";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const usersSchema = z
  .object({
    avatar: z.string(),
    email: z.string(),
    full_name: z.string(),
    registered_at: z.string(),
    short_name: z.string(),
  })
  .array();

function App() {
  const { data: users } = useQuery({
    queryKey: ["Users"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/users");
      const data = await response.json();

      return usersSchema.parse(data);
    },
  });

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <ul>
          {users?.map((user) => (
            <li key={user.full_name}>
              <p>
                User: {user.full_name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RootApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default RootApp;

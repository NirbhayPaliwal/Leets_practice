import Activity from "./components/Activity";
import Navbar from "./components/Navbar";
import VirtualContest from "./components/VirtaulContest";
const App = () => {
  return (
    <main className="bg-darker min-h-screen text-white">
      <Navbar />
      <Activity />
      <VirtualContest/>
    </main>
  );
}

export default App
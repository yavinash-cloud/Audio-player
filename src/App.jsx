import "./App.css";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  return (
    <>
      <h1 className="text-purple-500 text-2xl font-bold m-4">Audio Player</h1>
      <h1 className="text-black text-xs font-bold m-4">
        Select a Audio File to Play
      </h1>
      <AudioPlayer />
    </>
  );
}

export default App;

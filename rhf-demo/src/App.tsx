import YouTubeForm from "./components/YouTubeForm";

import "./App.css";
import { YupYouTubeForm } from "./components/YupYouTubeForm";

function App() {
  return (
    <div>
      <YouTubeForm />
      <br /><br /><br />
      new form below <hr />
      <YupYouTubeForm/>
    </div>
  );
}

export default App;

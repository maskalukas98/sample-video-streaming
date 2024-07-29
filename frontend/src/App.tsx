import React from 'react';
import './App.css';
import {Page} from "./layout/page/Page";
import {VideoPage} from "./pages/videoPage/VideoPage";

function App() {
  return (
      <Page>
          <VideoPage />
      </Page>
  );
}

export default App;

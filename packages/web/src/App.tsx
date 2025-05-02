import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import XCloudPage from "./pages/xcloud";
import StreamPage from "./pages/stream";

import SettingsAboutPage from "./pages/settings/about";
import SettingsStreamingPage from "./pages/settings/streaming";
import SettingsInputPage from "./pages/settings/input";
import SettingsAudioVideoPage from "./pages/settings/audiovideo";
import SettingsDebugPage from "./pages/settings/debug";

import DefaultLayout from "@/layouts/default";
import SettingsLayout from "@/layouts/settings";

function App() {
  return (
    <Routes>
      <Route element={<StreamPage />} path="/stream/:serverid" />

      <Route element={<DefaultLayout />}>
        <Route element={<IndexPage />} path="/" />
        <Route element={<XCloudPage />} path="/xcloud" />
        <Route element={<SettingsLayout />}>
          <Route element={<SettingsAboutPage />} path="/settings" />
          <Route element={<SettingsAboutPage />} path="/settings/about" />
          <Route element={<SettingsStreamingPage />} path="/settings/streaming" />
          <Route element={<SettingsInputPage />} path="/settings/input" />
          <Route element={<SettingsAudioVideoPage />} path="/settings/audiovideo" />
          <Route element={<SettingsDebugPage />} path="/settings/debug" />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

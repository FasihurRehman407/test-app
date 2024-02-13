// import BarCodeReader from "./BarCodeReader";

import { useState } from "react";
import Html5Plugin from "./Html5Plugin";

function App() {
  const [decodedResult, setDecodedResult] = useState(null);
  const onNewScanResult = (decodedText, decodedResult) => {
    setDecodedResult(decodedResult);
  };
  return (
    <div className="App">
      This is a test branch
      {/* <BarCodeReader /> */}
      {decodedResult && (
        <div>Scanned Result is: {decodedResult.decodedText}</div>
      )}
      <Html5Plugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
}

export default App;

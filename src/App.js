// import BarCodeReader from "./BarCodeReader";

import { useState } from "react";
import Html5Plugin from "./Html5Plugin";

function App() {
  const [decodedResult, setDecodedResult] = useState(null);
  const onNewScanResult = (decodedText, decodedResult) => {
    setDecodedResult(decodedResult);
  };
  return (
    <div className='App'>
      {/* <BarCodeReader /> */}
      {decodedResult && <div>Scanned Result is: {decodedResult.decodedText}</div>}
      <Html5Plugin
        fps={60}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
        mode='environment'
        aspectRatio={4 / 3}
      />
    </div>
  );
}

export default App;

// import BarCodeReader from "./BarCodeReader";

import Html5Plugin from "./Html5Plugin";

function App() {
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText, decodedResult);
  };
  return (
    <div className="App">
      {/* <BarCodeReader /> */}
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

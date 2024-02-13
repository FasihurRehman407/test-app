import React, { useState, useEffect, useRef } from "react";
import Quagga from "@ericblade/quagga2";

function BarCodeReader() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    if (scanning) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          initQuagga();
        })
        .catch((err) => console.error("Error accessing camera:", err));
    } else if (Quagga.initialized) {
      Quagga.stop();
    }

    return () => {
      // Clean up
      Quagga.stop();
    };
  }, [scanning]);

  const initQuagga = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: videoRef.current,
          constraints: {
            facingMode: "environment", // Use rear camera
          },
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "upc_reader",
            "upc_e_reader",
            "2of5_reader",
            "codabar_reader",
            "code_32_reader",
            "ean_2_reader",
            "ean_5_reader",
            "ean_8_reader",
            "code_39_vin_reader",
            "i2of5_reader",
            "code_93_reader",
            "code_39_reader",
          ],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Quagga initialization finished. Ready to start");
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      console.log(data.codeResult.code);
      setResult(data.codeResult.code);
      setScanning(false);
    });
  };

  const handleStartScan = () => {
    setScanning(true);
    setResult("");
  };

  return (
    <div>
      <button onClick={handleStartScan}>Start Scan</button>
      {scanning && (
        <video
          id="myVideo"
          style={{
            width: "400px",
            height: "400px",
            objectFit: "cover",
          }}
          ref={videoRef}
          autoPlay
        />
      )}
      <input type="text" value={result} placeholder="BarCodeResult" readOnly />
    </div>
  );
}

export default BarCodeReader;

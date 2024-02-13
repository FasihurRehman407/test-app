import React, { useState, useEffect, useRef } from "react";
import Quagga from "@ericblade/quagga2";

function BarCodeReader() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState("");
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (scanning && stream === null) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          setStream(stream);
        })
        .catch((err) => console.error("Error accessing camera:", err));
    } else if (!scanning && stream !== null) {
      stopStream();
    }
    return () => {
      if (stream !== null) {
        stopStream();
      }
    };
  }, [scanning, stream]);

  const stopStream = () => {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    setStream(null);
  };

  const initQuagga = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: videoRef.current,
          constraints: {
            facingMode: "environment",
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
    initQuagga();
  };

  return (
    <div>
      <button onClick={handleStartScan}>Start Scan</button>
      <div style={{ position: "relative" }}>
        {scanning && (
          <video
            id="myVideo"
            style={{
              width: window.innerWidth,
              height: "400px",
              objectFit: "cover",
            }}
            ref={videoRef}
            autoPlay
          />
        )}
        {scanning && (
          <div
            style={{
              position: "absolute",
              width: "210px",
              height: "60px",
              border: "1px solid red",
              top: "40%",
              left: "25%",
            }}
          ></div>
        )}
      </div>
      <input type="text" value={result} placeholder="BarCodeResult" readOnly />
    </div>
  );
}

export default BarCodeReader;

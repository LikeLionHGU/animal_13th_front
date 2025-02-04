import React from 'react'
import {useState, useRef} from 'react'
import axios from "axios";

function Camera() {
    const [imageSrc, setImageSrc] = useState(null);
    const [facingMode, setFacingMode] = useState("back");
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
        } catch (error) {
        console.error("Error accessing camera: ", error);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
        }
    };

    const toggleCamera = () => {
        setFacingMode(prevMode => (prevMode === "front" ? "back" : "front"));
        stopCamera();
        setTimeout(startCamera, 10);
    };

    const captureImage = async () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);
            setImageSrc(canvasRef.current.toDataURL("image/png"));
            // uploadImage();
        }
    };

    const uploadImage = async () => {
        if (!imageSrc) return;
        
        // Base64 데이터를 Blob으로 변환
        const blob = await fetch(imageSrc).then(res => res.blob());
        const formData = new FormData();
        formData.append("image", blob, "captured-image.png");
      
        try {
          const response = await axios.post("https://your-server.com/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
          });
          console.log("업로드 완료");
        } catch (error) {
          alert("업로드가 실패하였습니다.");
        }
      };
      

    return (
        <div>
            <video ref={videoRef} autoPlay/>
            <button onClick={startCamera} >Start Camera</button>
            <button onClick={stopCamera} >Stop Camera</button>
            <button onClick={toggleCamera} >Switch Camera</button>
            <button onClick={captureImage} >Capture Image</button>
            <button onClick={uploadImage} >Upload Image</button>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            {imageSrc && <img src={imageSrc} alt="Captured" />}
        </div>
    );
};

export default Camera
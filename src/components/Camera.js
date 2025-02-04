import { useState } from "react";
import axios from "axios";

const CameraUpload = () => {
  const [imageSrc, setImageSrc] = useState(null);

  // 파일 선택 시 자동 업로드
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file)); // 미리보기 설정
      await uploadImage(file); // 이미지 자동 업로드
    }
  };

  // 이미지 업로드
  const uploadImage = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("https://your-server.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("업로드 완료:", response.data);
    } catch (error) {
        alert("업로드 오류");
      console.error("업로드 오류:", error);
    }
  };

  return (
    <div>
      {/* 명확한 버튼 UI 추가 */}
      <button 
        onClick={() => document.getElementById("cameraInput").click()} 
      >
        📷 카메라 시작
      </button>

      {/* 파일 선택(input type="file") - 실제로는 숨겨짐 */}
      <input 
        id="cameraInput"
        type="file" 
        accept="image/*" 
        capture="environment" 
        onChange={handleFileChange} 
        className="hidden"
      />

      {/* 촬영한 이미지 미리보기 */}
      {imageSrc && <img src={imageSrc} alt="Captured"/>}
    </div>
  );
};

export default CameraUpload;

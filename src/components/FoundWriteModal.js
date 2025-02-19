import React, { useEffect } from "react";
import styles from "../styles/UploadConfirmModal.module.css";

const FoundWriteModal = ({ onClose, onConfirm }) => {
    useEffect(() => {
        // 모달이 열릴 때 body 스크롤 막기
        document.body.style.overflow = "hidden";
    
        return () => {
          // 모달이 닫힐 때 원래대로 복구
          document.body.style.overflow = "auto";
        };
      }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalContents}>
            <p className={styles.modalText}>
            도난 방지를 위해 조회 기록이 남습니다다 <br />
            진행하시겠습니까?
            </p>
        </div>
        <div className={styles.buttonContainer}>
            <button className={styles.cancelButton} onClick={onClose}>
                취소
            </button>
            <div className={styles.divider} />
            <button className={styles.confirmButton} onClick={onConfirm}>
                확인
            </button>
        </div>
      </div>
    </div>
  );
};

export default FoundWriteModal;
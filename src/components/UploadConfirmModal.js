import React, { useEffect } from "react";
import styles from "../styles/UploadConfirmModal.module.css";

const UploadConfirmModal = ({ onClose, onConfirm }) => {
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
            <p className={styles.modalTitle}>글을 업로드 하시겠습니까?</p>
            <p className={styles.modalText}>
            작성하신 글은 14일 후 자동 삭제되며, <br />
            이후에도 마이페이지에서 확인할 수 있습니다.
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

export default UploadConfirmModal;
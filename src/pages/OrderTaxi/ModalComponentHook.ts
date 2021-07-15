import { } from "antd";
import { useState } from "react";

export const useModalComponent = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return { isModalVisible, setIsModalVisible, handleOk };
}
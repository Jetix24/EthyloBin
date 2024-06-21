"use client";

import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return ( 
    <Modal isOpen={isOpen} onClose={onClose}>
    <div>
      Prueba
      Is open: {isOpen}
    </div>
    </Modal>
   );
}
 
export default GroupChatModal;
import React from "react"
import MuiModal from "@mui/material/Modal"
import { ModalProps } from "@mui/material"
import { ModalContentBox } from "./styles"

const Modal: React.FC<ModalProps> = ({ children, ...modalProps }) => {
  return (
    <div>
      <MuiModal {...modalProps}>
        <ModalContentBox>{children}</ModalContentBox>
      </MuiModal>
    </div>
  )
}
export default Modal

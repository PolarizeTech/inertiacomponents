import React, { PropsWithChildren } from 'react'
import Modal, { ModalProps } from '@ja-inertia/vendor/jetstream/components/Modal'

DialogModal.Content = function DialogModalContent({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="py-4">
      <div className="text-lg font-medium">{title}</div>
      {Array.isArray(children) && children.filter(child => !!child).length > 0 && (
        <div className="mt-4">{children}</div>
      )}
    </div>
  )
}

DialogModal.Footer = function DialogModalFooter({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="-mx-6 pt-4">
      <div className="p-6 bg-gray-100 text-right">
        {children}
      </div>
    </div>
  )
}

export default function DialogModal({
  children,
  ...modalProps
}: PropsWithChildren<ModalProps>) {
  return <Modal {...modalProps}><div className="px-6">{children}</div></Modal>
}

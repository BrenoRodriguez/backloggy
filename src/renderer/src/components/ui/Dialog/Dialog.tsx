import { DialogContainer } from './DialogContainer'
import { DialogHeader } from './DialogHeader'

type DialogProps = {
  children: React.ReactNode
  title: string
  onClose: () => void
  ariaLabelledby: string
}

export const Dialog = ({
  children,
  title,
  onClose,
  shouldOpen,
  ariaLabelledby,
}: DialogProps) => {
  return (
    <Dialog.Container aria-labelledby={ariaLabelledby}>
      <Dialog.Header title={title} onClose={onClose} />
      {children}
    </Dialog.Container>
  )
}

Dialog.Header = DialogHeader
Dialog.Container = DialogContainer

import Block from './block'

export function render(query: string, block: Block) {
  const root = document.querySelector(query)

  if (root) root.appendChild(block.getContent() as HTMLElement)

  block.dispatchComponentDidMount()
  return root
}

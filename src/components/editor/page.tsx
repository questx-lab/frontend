import dynamic from 'next/dynamic'

import { SmallSpinner } from '../spinner/spinner'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <SmallSpinner />,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

export default function Editor() {
  return (
    <QuillNoSSRWrapper
      className='rounded-lg'
      modules={modules}
      formats={formats}
      theme='snow'
    />
  )
}

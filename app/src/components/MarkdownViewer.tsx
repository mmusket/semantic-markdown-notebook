
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

export default function MarkdownViewer({ markdown }: { markdown: string }) {

    return (
        <ReactMarkdown
            className='prose lg:prose-xl text-left'
            children={markdown}
            remarkPlugins={[remarkGfm]} />
    )
}
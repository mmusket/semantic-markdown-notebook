import ContentEditable from 'react-contenteditable';
//TODO find a sanitization library that works in browser. 
// import sanitizeHtml from "sanitize-html"

export default function MarkdownEditor({ markdown, setMarkDown, className }: { markdown: string, setMarkDown: any, className: string }) {

    function formatMarkDown(markdown: string) {
        //TODO add color coding         
        return markdown;
    }

    const onContentChange = (evt: React.FormEvent<HTMLDivElement>) => {
        // const sanitizeConf = {
        //     allowedTags: ["span", "p", "br"],
        //     allowedAttributes: { a: ["href"] }
        // };

        // setMarkDown(sanitizeHtml(evt.currentTarget.innerText, sanitizeConf))
        setMarkDown(evt.currentTarget.innerText)
    }

    return (<>
        {markdown &&
            <ContentEditable
                tagName="pre"
                className={`editable text-left ${className}`}
                onChange={onContentChange}
                onBlur={onContentChange}
                html={formatMarkDown(markdown)} />}
    </>
    )
}
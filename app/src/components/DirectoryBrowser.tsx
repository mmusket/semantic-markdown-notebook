import { useFileSystem,useDirectory } from '$/hooks/useFileSystem';

export default function DirectoryBrowser() {


    const { selectFile, loadDirectory, list } = useDirectory();
    const { loadFile } = useFileSystem();

    return (
        <div className="flex flex-col items-end">
            <button onClick={loadDirectory}>Open Directory</button>
            {list?.map(e =>
                <div className="m-2" key={e.name}>
                    {e.kind}
                    {e.name}
                    <button onClick={() => loadFile(selectFile(e.name))}>Open</button>
                </div>)}
        </div>
    )
}
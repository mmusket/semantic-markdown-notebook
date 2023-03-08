import { useState, useContext, useEffect } from "react";

import { FilesContext } from "../App";

type FileNode = FileSystemDirectoryHandle | FileSystemFileHandle

export default function DirectoryBrowser() {

    const { file, setFile } = useContext(FilesContext);

    const [files, setFiles] = useState<FileNode[]>();
    const [currentFile, setCurrentFile] = useState<FileSystemFileHandle>();
    const [currentDirectory, setCurrentDirectory] = useState<FileSystemDirectoryHandle>();


    //Save text back to file 
    async function writeFile(fileHandle: FileSystemFileHandle, contents: any) {
        
        const writable = await fileHandle.createWritable();        
        await writable.write(contents);        
        await writable.close();
    }

    //Monitor For changes 
    //TODO add a buffer to limit saves to disk 
    //TODO Refactor file handling logic to its own composable 
    useEffect(() => {
        if (currentFile) {            
            writeFile(currentFile, file);
        }
    }, [file])


    /// Load directory to sidebar 
    const browse = async () => {
        let directoryHandle = await showDirectoryPicker();
        //TODO can we ask both read and write permissions at the same time? 
        directoryHandle.requestPermission({ mode: "readwrite" })
        setCurrentDirectory(directoryHandle);
        
        const filesInDir = [];
        for await (const entry of directoryHandle.values()) {
            console.log(entry.kind, entry.name);
            filesInDir.push(entry);
        }

        setFiles(filesInDir);
    }

    ///Get file text and load it. 
    //TODO add routing and load text on route enter 
    const selectFile = async (path: string) => {

        if (!currentDirectory) {
            return;
        }
        console.log(path);
        const file = await currentDirectory.getFileHandle(path);
        const f = await file.getFile();
        const innards = await f.text()

        setCurrentFile(file);
        setFile(innards);
    }

    return (
        <div className="flex flex-col items-end">
            <button onClick={browse}>Open Directory</button>
            {files?.map(e =>
                <div className="m-2" key={e.name}>
                    {e.kind}
                    {e.name}
                    <button onClick={() => selectFile(e.name)}>Open</button>
                </div>)}
        </div>
    )
}
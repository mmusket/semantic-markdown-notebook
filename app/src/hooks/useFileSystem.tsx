import { createContext, useContext, useEffect, useState } from "react";

export type FileContext = {
    file: string
    setFile: (c: string) => void
}

const FilesContext = createContext<FileContext>({file:"", setFile: ()=> {}});

type FileNode = FileSystemDirectoryHandle | FileSystemFileHandle

export function FileSystemProvider({ children }: any) {
    const [file, setFile] = useState("");
    return (
        <FilesContext.Provider value={{file, setFile}}>
            {children}
        </FilesContext.Provider>
    )
}

export function hasFile() {

    const F = useContext(FilesContext);
    return F == null ? false : true;
}


export function useDirectory() {

    const [files, setFiles] = useState<FileNode[]>();
    const [currentDirectory, setCurrentDirectory] = useState<FileSystemDirectoryHandle>();

    async function loadDirectory() {
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

    async function selectFile(path: string) {
        if (!currentDirectory) {
            return null;
        }
        console.log(path);
        const file = await currentDirectory.getFileHandle(path);
        return file;
    }

    return {
        selectFile,
        loadDirectory,
        list: files,
    }
}

export function useFileSystem() {

    const { file, setFile } = useContext(FilesContext);



    const [currentFile, setCurrentFile] = useState<FileSystemFileHandle>();



    //Save text back to file 
    async function writeFile(fileHandle: FileSystemFileHandle, contents: any) {

        const writable = await fileHandle.createWritable();
        await writable.write(contents);
        await writable.close();
    }

    //Monitor For changes 
    //TODO add a buffer to limit saves to disk     
    useEffect(() => {
        if (currentFile && file) {
            console.log('saving');
            writeFile(currentFile, file);
        }
    }, [file])


    async function loadFile(file: Promise<FileSystemFileHandle | null>) {

        let handle = await file;
        if (!handle) {
            return;
        }

        const f = await handle.getFile();
        const innards = await f.text()

        setCurrentFile(handle);
        setFile(innards);
    }

    return {
        loadFile,
        current: file,
        saveCurrent: setFile
    }
}
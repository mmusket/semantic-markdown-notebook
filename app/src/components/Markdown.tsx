import {  useState } from 'react';

import { Splitter, SplitterPanel } from 'primereact/splitter';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Menubar } from 'primereact/menubar';

import MarkdownEditor from '$/components/MarkdownEditor'
import MarkdownViewer from '$/components/MarkdownViewer'
import { useFileSystem } from '$/hooks/useFileSystem';

function Menu({ setMode }: any) {
    const items = [
        {
            label: 'Mode',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'Split',
                    icon: 'pi pi-fw pi-plus',
                    command: () => setMode('split')
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-plus',
                    command: () => setMode('edit')
                },
                {
                    label: 'View',
                    icon: 'pi pi-fw pi-plus',
                    command: () => setMode('view')
                },

            ]
        },
        {
            label: 'New',
            icon: 'pi pi-fw pi-pencil'
        }
    ];

    const start = <BreadCrumb />

    return (
        <Menubar model={items} start={start} />
    )
}


function SplitView({ file, setFile }: any) {

    return (
        <>
            <Splitter className="h-full" >
                <SplitterPanel
                    className="flex align-items-center justify-content-center">

                    <MarkdownEditor
                        className="w-full"
                        markdown={file}
                        setMarkDown={setFile} />

                </SplitterPanel>
                <SplitterPanel
                    className="flex align-items-center justify-content-center">

                    <MarkdownViewer markdown={file} />

                </SplitterPanel>
            </Splitter>
        </>
    )
}


export type MarkDownOptions = {
    mode: 'split' | 'edit' | 'view'
}

export default function Parent(options: MarkDownOptions) {


    const { current, saveCurrent } = useFileSystem();

    // const { file, setFile } = useContext(FilesContext);
    const [mode, setMode] = useState(options.mode);

    const Split = SplitView({ file: current, setFile: saveCurrent })
    const Edit = <MarkdownEditor
        className="w-full"
        markdown={current}
        setMarkDown={saveCurrent} />
    const View = <MarkdownViewer markdown={current} />

    return (
        <div className='flex flex-col w-full'>
            <Menu setMode={setMode} />
            {mode == 'edit' ? Edit : mode == 'view' ? View : Split}
        </div>
    )


}
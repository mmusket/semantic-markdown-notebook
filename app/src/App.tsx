import { createContext, useState } from 'react'
import { Splitter, SplitterPanel } from 'primereact/splitter';

import DirectoryBrowser from '$/components/DirectoryBrowser';
import Markdown from '$/components/Markdown'

export const FilesContext = createContext<string>("");

function App() {

  const [file, setFile] = useState<string>();
  return (

    <FilesContext.Provider value={{ file: file, setFile: setFile }}>

      <Splitter className="h-screen w-screen" >
        <SplitterPanel
          size={25} className="flex align-items-center justify-content-center">

          <DirectoryBrowser />

        </SplitterPanel>
        <SplitterPanel
          size={75}
          className="flex align-items-center justify-content-center">

          <Markdown mode='split' />

        </SplitterPanel>
      </Splitter>
    </FilesContext.Provider>
  )
}

export default App

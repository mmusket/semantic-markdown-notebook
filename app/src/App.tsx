import { Splitter, SplitterPanel } from 'primereact/splitter';

import DirectoryBrowser from '$/components/DirectoryBrowser';
import Markdown from '$/components/Markdown'
import MainMenu from '$/components/MainMenu'
import { FileSystemProvider } from '$/hooks/useFileSystem';
import { useState } from 'react';



function App() {

  const [sidebar,setSidebar] = useState<boolean>(true);
  const [semanticBar,setSemanticBar] = useState<boolean>(true);

  const twoPanel = <Splitter className="h-screen w-screen" >
    <SplitterPanel
      size={15} className="flex align-items-center justify-content-center">
      <DirectoryBrowser />
    </SplitterPanel>

    <SplitterPanel
      size={50}
      className="flex align-items-center justify-content-center">
      <Markdown mode='split' />
    </SplitterPanel>
  </Splitter>


  const threePanel = <Splitter className="h-screen w-screen" >
    <SplitterPanel
      size={15} className="flex align-items-center justify-content-center">
      <DirectoryBrowser />
    </SplitterPanel>

    <SplitterPanel
      size={50}
      className="flex align-items-center justify-content-center">
      <Markdown mode='split' />
    </SplitterPanel>


    <SplitterPanel
      size={25}
      className="flex align-items-center justify-content-center">
      Hi
    </SplitterPanel>


  </Splitter>


  return (
    <FileSystemProvider>
      <MainMenu 
      semantic={semanticBar} 
      sidebar={sidebar} 
      setSemanticBar={setSemanticBar} 
      setSidebar={setSidebar} />
      {semanticBar ? threePanel : twoPanel}
    </FileSystemProvider>
  )
}

export default App

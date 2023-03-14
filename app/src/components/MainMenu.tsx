import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dispatch, SetStateAction } from 'react';

type MenuOptions = {
    sidebar: boolean,
    setSidebar: Dispatch<SetStateAction<boolean>>
    semantic: boolean,
    setSemanticBar: Dispatch<SetStateAction<boolean>>
}

export default function MainMenu({ sidebar, semantic, setSemanticBar, setSidebar }: MenuOptions) {
    const items = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {
                            label: 'Bookmark',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-fw pi-video'
                        },

                    ]
                },

            ]
        },

        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',

        },

        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    const sidebarToggle = <Button label='Sidebar' onClick={e => setSidebar(!sidebar)} />
    const semanticToggle = <Button label='Semantic' onClick={e => setSemanticBar(!semantic)} />

    return (
        <div className="card">
            <Menubar model={items} start={sidebarToggle} end={semanticToggle} />
        </div>
    )
}

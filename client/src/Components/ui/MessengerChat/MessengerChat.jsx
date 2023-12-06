import React from 'react'
import { FacebookProvider, CustomChat } from 'react-facebook';

const MessengerChat = () => {
    return (
        <div>
       
            <FacebookProvider appId="883418563281350" chatSupport>
                <CustomChat pageId="122095481018006779" minimized={true} />
            </FacebookProvider>
        </div>
    )
}

export default MessengerChat

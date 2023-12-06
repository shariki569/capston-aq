import React from 'react'
import { FacebookProvider, CustomChat } from 'react-facebook';

const MessengerChat = () => {
    return (
        <div>
            test
            <FacebookProvider appId="208135552266953" chatSupport>
                <CustomChat pageId="122095481018006779" minimized={true} />
            </FacebookProvider>
        </div>
    )
}

export default MessengerChat

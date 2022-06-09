import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Talk from 'talkjs';


export default class SimpleChat extends Component {

    constructor(props) {
        super(props);
        
        this.inbox = undefined;
    }

    componentDidMount() {
        // Promise can be `then`ed multiple times
        Talk.ready
            .then(() => {
                const me = new Talk.User({
                    id: "12345231",
                    name: "Alnair González",
                    email: "george@looney.net",
                    photoUrl: "https://talkjs.com/docs/img/george.jpg",
                    welcomeMessage: "Hey there! How are you? :-)"
                });

                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: "tNdYPYjZ",
                        me: me
                    });
                }

                const other = new Talk.User({
                    id: "54321",
                    name: "Samantha Raygun",
                    email: "ronald@teflon.com",
                    photoUrl: "https://talkjs.com/docs/img/ronald.jpg",
                    welcomeMessage: "Buenos días gracias por comunicarse"
                });

                const other2 = new Talk.User({
                    id: "5432125",
                    name: "El buen doctor",
                    email: "elbuendocotr@pornhub.com",
                    photoUrl: "https://talkjs.com/docs/img/ronald.jpg",
                    welcomeMessage: "Vamos al chequeo diario"
                });

                // You control the ID of a conversation. oneOnOneId is a helper method that generates
                // a unique conversation ID for a given pair of users. 
                
                const conversationId = Talk.oneOnOneId(me, other);
            
                const conversation = window.talkSession.getOrCreateConversation(conversationId);
                conversation.setParticipant(me);
                conversation.setParticipant(other);
                conversation.setAttributes({
                    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTpn36OfsQvOj-ntaTZlzZWlpU5hyHpb3ygQ&usqp=CAU",
                });

                const conversationId2 = Talk.oneOnOneId(me, other2);
            
                const conversation2 = window.talkSession.getOrCreateConversation(conversationId2);
                conversation2.setParticipant(me);
                conversation2.setParticipant(other2);
                conversation2.setAttributes({
                    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuIB7jKB8BsES9VkPI8j6A12cyh8M3UceNHw&usqp=CAU",
                });
                this.inbox = window.talkSession.createInbox({
                    selected: conversation,
                    //selected: conversation2,
                });
                this.inbox.mount(this.container);

            })
            .catch(e => console.error(e));

            
    }

    componentWillUnmount() {
        if (this.inbox) {
            this.inbox.destroy();
        }
    }

    render() {
        return (<span>
            <div style={{height: '500px'}} ref={c => this.container = c}>Loading...</div>
        </span>);
    }
}

//ReactDOM.render(<SimpleChat />, document.getElementById('root'));

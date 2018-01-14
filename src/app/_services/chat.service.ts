import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PostCategory, Post } from '../_models/post';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AFService } from './af.service';
import { UserService } from './user.service';
import { Subject } from 'rxjs/Subject';
import { StateStore } from "../_stores/state.store";

@Injectable()
export class ChatService {

    user: firebase.User;
    userID: string;
    chatsFirebaseRef : firebase.database.Reference;
    messagesFirebaseRef : firebase.database.Reference;

    constructor(private db: AngularFireDatabase, 
                public afService : AFService,
                public userService : UserService) {

                this.afService.getUser().subscribe(user => {
                    if(user) {
                        this.user = user;
                        this.userID = user.uid;
                    }
                });
                this.chatsFirebaseRef = firebase.database().ref('chats');
                this.messagesFirebaseRef = firebase.database().ref('messages');
    }

//    getChats(userID: String): Observable<any> {
    //let uid = (this.userID) ? this.userID : _userID;
    getChats(): Observable<any> {
        return this.db.list(`/chats/${this.userID}`);
    }
    
    getChatById(recipientID: string): Observable<any> {
        return this.db.list(`/chats/${this.userID}/${recipientID}`);
    }

    // checkChatExists(outUID: string) {
    //     //.orderByChild("ID").equalTo(outUID).
    //     this.db.database.ref(`chats/${this.userID}/${outUID}`).once('value').then(function(snapshot) {
    //         console.log(snapshot.val());
    //         return (snapshot.val() !== null)
    //     });
    // }

    createChat(outUID: string) : string {
        let uid = this.userID;
        var chatKey = this.db.database.ref(`/chats/${uid}`).push().key;
        this.db.database.ref(`chats/${uid}/${outUID}`).set({chatID: chatKey});
        this.db.database.ref(`chats/${outUID}/${uid}`).set({chatID: chatKey});
        return chatKey;
    }

    getMessagesByChatID(outUID: string) {
        return this.getChatById(outUID).subscribe(chatID => this.messagesFirebaseRef.child(chatID));
    }
    
    sendMessage(outUID: string, message: {}) {
        this.getChatById(outUID).subscribe(chatID => {
            let chatKey = (chatID) ? chatID : this.createChat(outUID);
            this.db.database.ref(`messages/${chatKey}`).update(message);
        });
    }

}


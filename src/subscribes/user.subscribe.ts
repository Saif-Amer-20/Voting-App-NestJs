import { User } from './../user/user.entity';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm";
import * as bcrypt from 'bcrypt'
@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<User> {


    /**
     * Indicates that this subscriber only listen to Post events.
     */
    listenTo() {
        return User;
    }

    /**
     * Called before post insertion.
     */
  async  beforeInsert(event: InsertEvent<User>) {
        console.log(`BEFORE User INSERTED: `, event.entity);

        event.entity.password= await bcrypt.hash(event.entity.password,12);
     
    }

}
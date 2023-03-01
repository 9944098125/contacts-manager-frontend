import { WebRequestService } from './web-request.service';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactsService implements OnInit {
  constructor(private weReqService: WebRequestService) {}

  ngOnInit(): void {}

  getContacts() {
    return this.weReqService.get('contacts');
  }

  getContactById(id: string) {
    return this.weReqService.getById(`contacts/${id}`);
  }

  addContact(newContact: object) {
    return this.weReqService.post('contacts/create-contact', newContact);
  }

  editContact(id: string, editedContact: object) {
    return this.weReqService.patch(
      `contacts/update-contact/${id}`,
      editedContact
    );
  }

  deleteContact(id: string) {
    return this.weReqService.delete(`contacts/delete-contact/${id}`);
  }
}

import { ContactsService } from './../contacts.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: any;
  formModal: any;
  name: any;
  email: any;
  phone: any;
  selectedFile: any;
  image: any;
  contact: any = {};

  isCreatingContact = false;

  @ViewChild('myForm') myForm: any;
  @ViewChild('imageInput') imageInput: any;
  constructor(private contactsService: ContactsService) {}

  showModal() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('createModal')
    );
    this.myForm.resetForm();
    this.formModal.show();
  }

  showEditModal(id: string) {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('editModal')
    );
    this.formModal.show();
    this.imageInput.nativeElement.value = '';
    this.contactsService.getContactById(id).subscribe(
      (contact) => {
        this.contact = contact;
        // console.log(contact);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  closeModal() {
    this.formModal.hide();
  }

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((contacts) => {
      console.log(contacts);
      this.contacts = contacts;
    });
  }

  deleteContact(id: string) {
    this.contactsService.deleteContact(id).subscribe(
      (res) => {
        this.contactsService.getContacts().subscribe((newList) => {
          this.contacts = newList;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const data = new FormData();
    data.append('file', this.selectedFile);
    data.append('upload_preset', 'projects');
    data.append('cloud_name', 'dakda5ni3');
    fetch('https://api.cloudinary.com/v1_1/dakda5ni3/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res: any) => res.json())
      .then((data) => {
        this.image = data.url;
        console.log(this.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitCreateNewContact() {
    const body = {
      name: this.name,
      email: this.email,
      phoneNo: this.phone,
      image: this.image,
    };
    if (!this.isCreatingContact) {
      this.isCreatingContact = true;
      this.contactsService.addContact(body).subscribe(
        (res) => {
          this.contactsService.getContacts().subscribe(
            (newList) => {
              this.contacts = newList;
            },
            (err) => {
              console.log(err);
            }
          );
          this.formModal.hide();
        },
        (err) => {
          console.log(err);
        }
      );
      this.isCreatingContact = false;
    }
    this.myForm.resetForm();
  }

  updateContact(id: string) {
    const body = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      image: this.image,
    };
    this.contactsService.editContact(id, body).subscribe(
      (res) => {
        this.contact = res;
        // console.log(res);
        this.formModal.hide();
        this.contactsService.getContacts().subscribe(
          (updatedList) => {
            this.contacts = updatedList;
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
    this.myForm.resetForm();
  }
}

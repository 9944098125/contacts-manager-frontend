import { ContactsService } from './../contacts.service';
import { Component, OnInit, ViewChild } from '@angular/core';

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

  isCreatingContact = false;

  @ViewChild('myForm') myForm: any;
  constructor(private contactsService: ContactsService) {}

  showModal() {
    this.formModal.show();
  }

  closeModal() {
    this.formModal.hide();
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('createEditModal')
    );
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
}

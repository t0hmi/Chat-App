import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ChannelActions } from 'src/app/store/channel';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  styleUrls: ['./chat-create.component.scss']
})
export class ChatCreateComponent implements OnInit {

  @ViewChild('overlay')
  overlay!: ElementRef;

  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<boolean>() 

  constructor(private fb : FormBuilder, private store :  Store) { }

  name = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  formGroup = new FormGroup({
    name : this.name,
    description : this.description
  });

  ngOnInit(): void {
  }
  
  @HostListener('click', ['$event'])
  toggleModal(event : any): void {
    if(event.originalTarget === this.overlay.nativeElement) {
      this.closeModal.emit(true);
      this.formGroup.reset();
    }
  }

  createChannel() : void {
    this.formGroup.markAllAsTouched();

    if(!this.formGroup.valid) return;

    const {name, description} = this.formGroup.value;

    if(name && description) {
      this.store.dispatch(ChannelActions.createChannel({name, description}));
      this.closeModal.emit(true);
    }

    this.formGroup.reset();
  }
}

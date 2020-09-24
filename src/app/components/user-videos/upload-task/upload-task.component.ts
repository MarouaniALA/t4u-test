import {Component, Input, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;
  canceled: boolean;
  uploadForm: FormGroup;
  breakpoint: number;

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore,
              private authService: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.buildForm();
  }

  buildForm() {
    this.uploadForm = this.formBuilder.group({
      title: [, Validators.required],
    });
  }

  startUpload() {
    if (!this.uploadForm.valid) {
      return;
    }

    const path = `videos/${Date.now()}_${this.file.name}`;

    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);

    this.task.catch(() => {
        this.canceled = true;
      }
    );

    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.afs.collection('files').add({
          downloadURL: this.downloadURL, path,
          uid: this.authService.userData.uid,
          type: this.file.type,
          title: this.uploadForm.get('title').value
        });
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }
}

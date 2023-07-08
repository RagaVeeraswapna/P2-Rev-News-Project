import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import { DELETE_USER } from 'src/app/users/users/gql/users-mutation';
import { Users } from 'src/app/users/users/users';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']
})
export class DeleteProfileComponent {

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: Users }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteProfile(): void {
    const userId = this.data.user?.id;
  
    if (userId) {
      this.apollo
        .mutate<{ removeUser: Users }>({
          mutation: DELETE_USER,
          variables: { id: userId },
        })
        .subscribe(() => {
          this.http.delete(`http://localhost:3030/users/${userId}`)
            .subscribe(() => {
              alert('Profile deleted');
              this.dialogRef.close('deleted');
            }, error => {
              console.error('Error deleting user:', error);
            });
        });
    }
  }
}
 
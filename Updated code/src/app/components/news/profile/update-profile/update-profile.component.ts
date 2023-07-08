import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import { UPDATE_USER } from 'src/app/users/users/gql/users-mutation';
import { Users } from 'src/app/users/users/users';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  constructor(private apollo: Apollo,
    private http: HttpClient,
    public dialogRef: MatDialogRef<UpdateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: Users }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateUser(): void {
    const updatedUser = this.data.user;
    const userId = updatedUser?.id;
  
    if (userId) {
      this.apollo
        .mutate<{ updateUser: Users }>({
          mutation: UPDATE_USER,
          variables: { id: userId, input: updatedUser },
        })
        .subscribe(() => {
          this.http.put(`http://localhost:3030/users/${userId}`, updatedUser)
            .subscribe(() => {
              alert('User updated');
              this.closeDialog();
            }, error => {
              console.error('Error updating user:', error);
            });
        });
    }
  }
}

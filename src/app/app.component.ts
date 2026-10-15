import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  taskManagementForm!: FormGroup;
  data: TaskManagementData[] = [];
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    localStorage.clear();
    this.taskManagementForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.loadData();
  }

  onSubmit() {
    if (this.taskManagementForm.valid) {
      const newTask: TaskManagementData = {
        title: this.taskManagementForm.get('title')?.value,
        description: this.taskManagementForm.get('description')?.value
      };
      this.data.push(newTask);
      localStorage.setItem('taskManagementData', JSON.stringify(this.data));
      this.taskManagementForm.reset();
    }
  }

  loadData() {
    const storedData = localStorage.getItem('taskManagementData');
    if (storedData) {
      this.data = JSON.parse(storedData);
    }
  }

  ngOnDestroy(): void {
    localStorage.clear();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

interface TaskManagementData {
  title: string;
  description: string;
}
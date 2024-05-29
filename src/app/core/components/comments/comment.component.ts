import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { HappenComment } from '../../interfaces/happens/happen.comment.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnChanges {
  public form: FormControl = new FormControl('');
  public expanded!: string;

  private readonly detectorChange = inject(ChangeDetectorRef);

  @Input()
  public comment!: HappenComment;

  @Input()
  public id: string | null | undefined;

  @Output()
  public onComment = new EventEmitter<HappenComment>();

  @Output()
  public onDelete = new EventEmitter<HappenComment>();

  ngOnChanges(_: SimpleChanges): void {
    this.detectorChange.detectChanges();
    this.form.setValue(this.comment.text);
  }

  public onRemove(comment: HappenComment) {
    this.onDelete.emit(comment);
  }

  public updateComment(comment: HappenComment) {
    this.onComment.emit({ ...comment, text: this.form.value.trim() });
    this.form.reset();
    this.expanded = '';
  }

  public get getInsigniaColor() {
    if (this.comment.scoreNegative > this.comment.scorePositive) {
      return 'red';
    }
    return 'green';
  }
}
